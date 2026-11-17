import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateAddressDto,
  UpdateAddressDto,
  UpdateProfileDto,
} from './dto/profile.dto';

const PROFIL_SELECT = {
  id: true,
  nama: true,
  email: true,
  telepon: true,
  avatar: true,
  role: true,
  createdAt: true,
} as const;

@Injectable()
export class ProfileService {
  constructor(private prisma: PrismaService) {}

  async getProfile(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        ...PROFIL_SELECT,
        alamat: { orderBy: [{ utama: 'desc' }, { id: 'desc' }] },
      },
    });
    if (!user) {
      throw new NotFoundException('Pengguna tidak ditemukan');
    }
    return user;
  }

  updateProfile(userId: number, dto: UpdateProfileDto) {
    return this.prisma.user.update({
      where: { id: userId },
      data: dto,
      select: PROFIL_SELECT,
    });
  }

  listAddresses(userId: number) {
    return this.prisma.address.findMany({
      where: { userId },
      orderBy: [{ utama: 'desc' }, { id: 'desc' }],
    });
  }

  async createAddress(userId: number, dto: CreateAddressDto) {
    if (dto.utama) {
      await this.prisma.address.updateMany({
        where: { userId },
        data: { utama: false },
      });
    }

    return this.prisma.address.create({
      data: { ...dto, userId },
    });
  }

  async updateAddress(userId: number, id: number, dto: UpdateAddressDto) {
    const alamat = await this.prisma.address.findUnique({ where: { id } });
    if (!alamat) {
      throw new NotFoundException(`Alamat #${id} tidak ditemukan`);
    }
    if (alamat.userId !== userId) {
      throw new ForbiddenException('Anda tidak memiliki akses ke alamat ini');
    }

    if (dto.utama) {
      await this.prisma.address.updateMany({
        where: { userId, id: { not: id } },
        data: { utama: false },
      });
    }

    return this.prisma.address.update({
      where: { id },
      data: dto,
    });
  }

  async removeAddress(userId: number, id: number) {
    const alamat = await this.prisma.address.findUnique({ where: { id } });
    if (!alamat) {
      throw new NotFoundException(`Alamat #${id} tidak ditemukan`);
    }
    if (alamat.userId !== userId) {
      throw new ForbiddenException('Anda tidak memiliki akses ke alamat ini');
    }

    await this.prisma.address.delete({ where: { id } });
  }
}
