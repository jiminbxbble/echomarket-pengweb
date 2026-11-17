import { ConflictException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';

// Prisma di-mock supaya unit test tidak butuh database sungguhan
const prismaMock = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
    findUniqueOrThrow: jest.fn(),
  },
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const modul = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: PrismaService, useValue: prismaMock },
        {
          provide: JwtService,
          useValue: { sign: jest.fn(() => 'token-palsu') },
        },
      ],
    }).compile();
    service = modul.get(AuthService);
  });

  const userDb = async (password = 'rahasia123') => ({
    id: 1,
    nama: 'Thoriq',
    email: 'thoriq@contoh.com',
    password: await bcrypt.hash(password, 4),
    role: 'USER',
  });

  it('register: membuat user dan tidak mengembalikan password', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    prismaMock.user.create.mockResolvedValue(await userDb());

    const hasil = await service.register({
      nama: 'Thoriq',
      email: 'thoriq@contoh.com',
      password: 'rahasia123',
    });

    expect(hasil.accessToken).toBe('token-palsu');
    expect(hasil.user).not.toHaveProperty('password');
    // password yang disimpan harus hash, bukan teks asli
    const argumen = prismaMock.user.create.mock.calls[0] as [
      { data: { password: string } },
    ];
    const disimpan = argumen[0].data.password;
    expect(disimpan).not.toBe('rahasia123');
  });

  it('register: email duplikat -> 409 Conflict', async () => {
    prismaMock.user.findUnique.mockResolvedValue(await userDb());
    await expect(
      service.register({
        nama: 'X',
        email: 'thoriq@contoh.com',
        password: 'rahasia123',
      }),
    ).rejects.toThrow(ConflictException);
  });

  it('login: password benar -> dapat token', async () => {
    prismaMock.user.findUnique.mockResolvedValue(await userDb());
    const hasil = await service.login({
      email: 'thoriq@contoh.com',
      password: 'rahasia123',
    });
    expect(hasil.accessToken).toBe('token-palsu');
  });

  it('login: password salah -> 401 Unauthorized', async () => {
    prismaMock.user.findUnique.mockResolvedValue(await userDb());
    await expect(
      service.login({ email: 'thoriq@contoh.com', password: 'salah' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('login: email tidak terdaftar -> 401 dengan pesan yang sama', async () => {
    prismaMock.user.findUnique.mockResolvedValue(null);
    await expect(
      service.login({ email: 'tidakada@contoh.com', password: 'apapun' }),
    ).rejects.toThrow('Email atau password salah');
  });
});
