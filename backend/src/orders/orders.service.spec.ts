import { BadRequestException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { OrdersService } from './orders.service';

const txMock = {
  cartItem: {
    findMany: jest.fn(),
    deleteMany: jest.fn(),
  },
  product: {
    findMany: jest.fn(),
    update: jest.fn(),
  },
  order: {
    create: jest.fn(),
  },
};

const prismaMock = {
  $transaction: jest.fn((cb: (tx: typeof txMock) => unknown) => cb(txMock)),
  order: {
    findMany: jest.fn(),
    findUnique: jest.fn(),
    update: jest.fn(),
  },
};

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const modul = await Test.createTestingModule({
      providers: [
        OrdersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();
    service = modul.get(OrdersService);
  });

  it('create: melempar BadRequestException jika keranjang kosong', async () => {
    txMock.cartItem.findMany.mockResolvedValue([]);

    await expect(
      service.create(1, {
        metodeBayar: 'QRIS',
        alamatKirim: 'Bandung',
        ongkir: 6500,
      }),
    ).rejects.toThrow(BadRequestException);
  });

  it('create: membuat pesanan dan menghitung total + ongkir', async () => {
    txMock.product.findMany.mockResolvedValue([
      { id: 1, nama: 'Tempat pensil', harga: 10000, stok: 10 },
    ]);
    txMock.order.create.mockResolvedValue({
      id: 1,
      total: 26500,
      ongkir: 6500,
    });

    const res = await service.create(1, {
      metodeBayar: 'QRIS',
      alamatKirim: 'Bandung',
      ongkir: 6500,
      items: [{ productId: 1, jumlah: 2 }],
    });

    expect(res.total).toBe(26500);
    expect(txMock.product.update).toHaveBeenCalledWith({
      where: { id: 1 },
      data: { stok: { decrement: 2 }, terjual: { increment: 2 } },
    });
    expect(txMock.cartItem.deleteMany).toHaveBeenCalled();
  });
});
