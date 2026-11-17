import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

export type UserAman = Omit<User, 'password'>;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const ada = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (ada) throw new ConflictException('Email sudah terdaftar');

    const user = await this.prisma.user.create({
      data: {
        nama: dto.nama,
        email: dto.email,
        password: await bcrypt.hash(dto.password, 10),
      },
    });
    return this.buatRespons(user);
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    // Pesan sama untuk email salah & password salah, agar penyerang
    // tidak bisa menebak email mana yang terdaftar.
    const cocok = user && (await bcrypt.compare(dto.password, user.password));
    if (!user || !cocok) {
      throw new UnauthorizedException('Email atau password salah');
    }
    return this.buatRespons(user);
  }

  async profil(userId: number): Promise<UserAman> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
    });
    return this.tanpaPassword(user);
  }

  private buatRespons(user: User) {
    const accessToken = this.jwt.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { accessToken, user: this.tanpaPassword(user) };
  }

  private tanpaPassword(user: User): UserAman {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...sisa } = user;
    return sisa;
  }
}
