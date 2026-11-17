import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async findAll(userId: number) {
    const items = await this.prisma.cartItem.findMany({
      where: { userId },
      include: {
        product: {
          include: { kategori: { select: { id: true, nama: true } } },
        },
      },
      orderBy: { id: 'desc' },
    });

    const subtotal = items.reduce(
      (total, item) => total + item.product.harga * item.jumlah,
      0,
    );

    return { items, subtotal };
  }

  async add(userId: number, dto: AddToCartDto) {
    const produk = await this.prisma.product.findUnique({
      where: { id: dto.productId },
    });
    if (!produk) {
      throw new NotFoundException(`Produk #${dto.productId} tidak ditemukan`);
    }

    const existing = await this.prisma.cartItem.findUnique({
      where: { userId_productId: { userId, productId: dto.productId } },
    });

    const jumlahBaru = (existing?.jumlah ?? 0) + dto.jumlah;
    if (produk.stok < jumlahBaru) {
      throw new BadRequestException(
        `Stok produk "${produk.nama}" tidak mencukupi (tersisa ${produk.stok})`,
      );
    }

    return this.prisma.cartItem.upsert({
      where: { userId_productId: { userId, productId: dto.productId } },
      update: { jumlah: jumlahBaru },
      create: {
        userId,
        productId: dto.productId,
        jumlah: dto.jumlah,
      },
      include: { product: true },
    });
  }

  async update(userId: number, id: number, dto: UpdateCartDto) {
    const item = await this.prisma.cartItem.findUnique({
      where: { id },
      include: { product: true },
    });
    if (!item) {
      throw new NotFoundException(`Item keranjang #${id} tidak ditemukan`);
    }
    if (item.userId !== userId) {
      throw new ForbiddenException('Anda tidak memiliki akses ke item ini');
    }
    if (item.product.stok < dto.jumlah) {
      throw new BadRequestException(
        `Stok produk "${item.product.nama}" tidak mencukupi (tersisa ${item.product.stok})`,
      );
    }

    return this.prisma.cartItem.update({
      where: { id },
      data: { jumlah: dto.jumlah },
      include: { product: true },
    });
  }

  async remove(userId: number, id: number) {
    const item = await this.prisma.cartItem.findUnique({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item keranjang #${id} tidak ditemukan`);
    }
    if (item.userId !== userId) {
      throw new ForbiddenException('Anda tidak memiliki akses ke item ini');
    }

    await this.prisma.cartItem.delete({ where: { id } });
  }
}
