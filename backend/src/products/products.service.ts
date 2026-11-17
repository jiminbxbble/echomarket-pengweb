import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProductDto,
  QueryProductDto,
  UpdateProductDto,
} from './dto/product.dto';

const URUTAN: Record<
  NonNullable<QueryProductDto['urut']>,
  Prisma.ProductOrderByWithRelationInput
> = {
  terbaru: { createdAt: 'desc' },
  termurah: { harga: 'asc' },
  termahal: { harga: 'desc' },
  terlaris: { terjual: 'desc' },
  rating: { rating: 'desc' },
};

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: QueryProductDto) {
    const where = this.buatFilter(query);
    const { halaman, perHalaman } = query;

    // count & findMany dijalankan dalam satu transaksi (satu round-trip ke Neon)
    const [total, data] = await this.prisma.$transaction([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        orderBy: URUTAN[query.urut ?? 'terbaru'],
        skip: (halaman - 1) * perHalaman,
        take: perHalaman,
        include: { kategori: { select: { id: true, nama: true } } },
      }),
    ]);

    return {
      data,
      meta: {
        total,
        halaman,
        perHalaman,
        totalHalaman: Math.ceil(total / perHalaman),
      },
    };
  }

  /**
   * Mengubah query string dari frontend menjadi filter Prisma (WHERE).
   * Contoh: GET /products?q=pensil&kategori=kardus&hargaMax=20000
   */
  buatFilter(query: QueryProductDto): Prisma.ProductWhereInput {
    const where: Prisma.ProductWhereInput = {};

    if (query.q) {
      where.OR = [
        { nama: { contains: query.q, mode: 'insensitive' } },
        { deskripsi: { contains: query.q, mode: 'insensitive' } },
      ];
    }

    if (query.kategori) {
      where.kategoriId = query.kategori;
    }

    if (query.hargaMin !== undefined || query.hargaMax !== undefined) {
      where.harga = {
        ...(query.hargaMin !== undefined ? { gte: query.hargaMin } : {}),
        ...(query.hargaMax !== undefined ? { lte: query.hargaMax } : {}),
      };
    }

    if (query.flashSale !== undefined) {
      where.flashSale = query.flashSale;
    }

    return where;
  }

  async findOne(id: number) {
    const produk = await this.prisma.product.findUnique({
      where: { id },
      include: {
        kategori: true,
        penjual: { select: { id: true, nama: true } },
      },
    });
    if (!produk) throw new NotFoundException(`Produk #${id} tidak ditemukan`);
    return produk;
  }

  create(dto: CreateProductDto, penjualId: number) {
    return this.prisma.product.create({ data: { ...dto, penjualId } });
  }

  async update(id: number, dto: UpdateProductDto) {
    await this.findOne(id); // 404 kalau tidak ada
    return this.prisma.product.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.product.delete({ where: { id } });
  }

  kategori() {
    return this.prisma.category.findMany({
      orderBy: { nama: 'asc' },
      include: { _count: { select: { produk: true } } },
    });
  }
}
