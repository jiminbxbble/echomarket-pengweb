import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { StatusPesanan } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  findAll(userId: number) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, nama: true, gambar: true, harga: true },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(userId: number, role: string, id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, nama: true, gambar: true, harga: true },
            },
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Pesanan #${id} tidak ditemukan`);
    }
    if (order.userId !== userId && role !== 'ADMIN') {
      throw new ForbiddenException('Anda tidak memiliki akses ke pesanan ini');
    }
    return order;
  }

  async create(userId: number, dto: CreateOrderDto) {
    return this.prisma.$transaction(async (tx) => {
      let targetItems = dto.items ?? [];

      if (targetItems.length === 0) {
        const cartItems = await tx.cartItem.findMany({
          where: { userId },
          select: { productId: true, jumlah: true },
        });
        targetItems = cartItems;
      }

      if (targetItems.length === 0) {
        throw new BadRequestException(
          'Keranjang kosong dan tidak ada item yang dipilih untuk checkout',
        );
      }

      const productIds = targetItems.map((i) => i.productId);
      const products = await tx.product.findMany({
        where: { id: { in: productIds } },
      });
      const productMap = new Map(products.map((p) => [p.id, p]));

      let subtotal = 0;
      const orderItemsData: {
        productId: number;
        jumlah: number;
        harga: number;
      }[] = [];

      for (const item of targetItems) {
        const produk = productMap.get(item.productId);
        if (!produk) {
          throw new NotFoundException(
            `Produk #${item.productId} tidak ditemukan`,
          );
        }
        if (produk.stok < item.jumlah) {
          throw new BadRequestException(
            `Stok produk "${produk.nama}" tidak mencukupi (tersisa ${produk.stok})`,
          );
        }

        subtotal += produk.harga * item.jumlah;
        orderItemsData.push({
          productId: produk.id,
          jumlah: item.jumlah,
          harga: produk.harga,
        });

        await tx.product.update({
          where: { id: produk.id },
          data: {
            stok: { decrement: item.jumlah },
            terjual: { increment: item.jumlah },
          },
        });
      }

      const ongkir = dto.ongkir ?? 0;
      const order = await tx.order.create({
        data: {
          userId,
          total: subtotal + ongkir,
          ongkir,
          metodeBayar: dto.metodeBayar,
          alamatKirim: dto.alamatKirim,
          status: StatusPesanan.MENUNGGU_PEMBAYARAN,
          items: { create: orderItemsData },
        },
        include: {
          items: {
            include: {
              product: {
                select: { id: true, nama: true, gambar: true, harga: true },
              },
            },
          },
        },
      });

      // Hapus item yang sudah dibeli dari keranjang
      await tx.cartItem.deleteMany({
        where: { userId, productId: { in: productIds } },
      });

      return order;
    });
  }

  async updateStatus(
    userId: number,
    role: string,
    id: number,
    dto: UpdateOrderStatusDto,
  ) {
    const order = await this.findOne(userId, role, id);

    if (role !== 'ADMIN') {
      const bolehUser =
        order.status === StatusPesanan.MENUNGGU_PEMBAYARAN &&
        (dto.status === StatusPesanan.DIBAYAR ||
          dto.status === StatusPesanan.DIBATALKAN);
      if (!bolehUser) {
        throw new ForbiddenException(
          'Perubahan status pesanan hanya dapat dilakukan oleh admin',
        );
      }
    }

    return this.prisma.order.update({
      where: { id },
      data: { status: dto.status },
      include: {
        items: {
          include: {
            product: {
              select: { id: true, nama: true, gambar: true, harga: true },
            },
          },
        },
      },
    });
  }
}
