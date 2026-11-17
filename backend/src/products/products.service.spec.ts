import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { ProductsService } from './products.service';

const prismaMock = {
  $transaction: jest.fn(),
  product: {
    count: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  category: {
    findMany: jest.fn(),
  },
};

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const modul = await Test.createTestingModule({
      providers: [
        ProductsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = modul.get(ProductsService);
  });

  it('buatFilter: membangun filter pencarian, kategori, harga, dan flashSale', () => {
    const filter = service.buatFilter({
      q: 'kardus',
      kategori: 'kardus',
      hargaMin: 5000,
      hargaMax: 20000,
      flashSale: true,
      halaman: 1,
      perHalaman: 12,
    });

    expect(filter).toEqual({
      OR: [
        { nama: { contains: 'kardus', mode: 'insensitive' } },
        { deskripsi: { contains: 'kardus', mode: 'insensitive' } },
      ],
      kategoriId: 'kardus',
      harga: { gte: 5000, lte: 20000 },
      flashSale: true,
    });
  });

  it('findOne: melempar NotFoundException jika produk tidak ada', async () => {
    prismaMock.product.findUnique.mockResolvedValue(null);
    await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
  });
});
