import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCommentDto,
  CreatePostDto,
  QueryPostDto,
} from './dto/community.dto';

@Injectable()
export class CommunityService {
  constructor(private prisma: PrismaService) {}

  listPosts(query: QueryPostDto) {
    const q = query.q?.trim();
    return this.prisma.post.findMany({
      where: q
        ? {
            OR: [
              { teks: { contains: q, mode: 'insensitive' } },
              { user: { nama: { contains: q, mode: 'insensitive' } } },
            ],
          }
        : undefined,
      include: {
        user: { select: { id: true, nama: true, avatar: true } },
        komentar: {
          include: {
            user: { select: { id: true, nama: true, avatar: true } },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  createPost(userId: number, dto: CreatePostDto) {
    return this.prisma.post.create({
      data: {
        userId,
        teks: dto.teks,
        gambar: dto.gambar ?? [],
      },
      include: {
        user: { select: { id: true, nama: true, avatar: true } },
        komentar: {
          include: {
            user: { select: { id: true, nama: true, avatar: true } },
          },
        },
      },
    });
  }

  async likePost(postId: number) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Postingan #${postId} tidak ditemukan`);
    }

    return this.prisma.post.update({
      where: { id: postId },
      data: { suka: { increment: 1 } },
      select: { id: true, suka: true },
    });
  }

  async addComment(userId: number, postId: number, dto: CreateCommentDto) {
    const post = await this.prisma.post.findUnique({ where: { id: postId } });
    if (!post) {
      throw new NotFoundException(`Postingan #${postId} tidak ditemukan`);
    }

    return this.prisma.comment.create({
      data: {
        postId,
        userId,
        teks: dto.teks,
      },
      include: {
        user: { select: { id: true, nama: true, avatar: true } },
      },
    });
  }

  listTutorials() {
    return this.prisma.tutorial.findMany({
      orderBy: { id: 'asc' },
    });
  }
}
