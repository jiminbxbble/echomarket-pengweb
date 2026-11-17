import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

// Mengubah error Prisma menjadi status HTTP yang tepat,
// supaya client tidak menerima 500 untuk kesalahan yang sebenarnya dari input.
@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();

    const peta: Record<string, [number, string]> = {
      P2002: [HttpStatus.CONFLICT, 'Data sudah ada (duplikat)'],
      P2025: [HttpStatus.NOT_FOUND, 'Data tidak ditemukan'],
      P2003: [HttpStatus.BAD_REQUEST, 'Relasi data tidak valid'],
    };
    const [statusCode, message] = peta[exception.code] ?? [
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Terjadi kesalahan pada database',
    ];

    res.status(statusCode).json({ statusCode, message, error: exception.code });
  }
}
