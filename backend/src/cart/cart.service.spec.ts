import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from './cart.service';

const prismaMock = {
  cartItem: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    upsert: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
  product: {
    findUnique: jest.fn(),
  },
};

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const modul = await Test.createTestingModule({
      providers: [
        CartService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = modul.get(CartService);
  });

  it('findAll: menghitung subtotal keranjang dengan benar', async () => {
    prismaMock.cartItem.findMany.mockResolvedValue([
      { id: 1, jumlah: 2, product: { harga: 10000 } },
      { id: 2, jumlah: 1, product: { harga: 15000 } },
    ]);

    const res = await service.findAll(1);
    expect(res.subtotal).toBe(35000);
    expect(res.items).toHaveLength(2);
  });

  it('add: melempar BadRequestException jika stok tidak cukup', async () => {
    prismaMock.product.findUnique.mockResolvedValue({
      id: 1,
      nama: 'Kardus',
      stok: 2,
    });
    prismaMock.cartItem.findUnique.mockResolvedValue({ jumlah: 1 });

    await expect(
      service.add(1, { productId: 1, jumlah: 2 }),
    ).rejects.toThrow(BadRequestException);
  });

  it('remove: melempar ForbiddenException jika item milik user lain', async () => {
    prismaMock.cartItem.findUnique.mockResolvedValue({ id: 5, userId: 99 });
    await expect(service.remove(1, 5)).rejects.toThrow(ForbiddenException);
  });

  it('remove: melempar NotFoundException jika item tidak ditemukan', async () => {
    prismaMock.cartItem.findUnique.mockResolvedValue(null);
    await expect(service.remove(1, 5)).rejects.toThrow(NotFoundException);
  });
});
