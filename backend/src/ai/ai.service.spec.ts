import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { AiService } from './ai.service';

const prismaMock = {
  product: {
    findMany: jest.fn(),
  },
};

describe('AiService', () => {
  let service: AiService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const modul = await Test.createTestingModule({
      providers: [
        AiService,
        { provide: PrismaService, useValue: prismaMock },
        {
          provide: ConfigService,
          useValue: { get: jest.fn(() => '') },
        },
      ],
    }).compile();
    service = modul.get(AiService);
  });

  it('chat: menggunakan mode fallback dengan rekomendasi produk saat GROQ_API_KEY kosong', async () => {
    prismaMock.product.findMany.mockResolvedValue([
      {
        id: 1,
        nama: 'Tempat pensil dari kardus',
        harga: 10000,
        kategoriId: 'kardus',
        lokasi: 'Bandung',
        rating: 4.9,
        gambar: '/img/produk.webp',
      },
    ]);

    const res = await service.chat({ message: 'Cari produk kardus' });
    expect(res.mode).toBe('fallback');
    expect(res.recommendations).toHaveLength(1);
    expect(res.reply).toContain('Tempat pensil dari kardus');
  });
});
