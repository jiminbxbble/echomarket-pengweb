import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { PrismaExceptionFilter } from './common/prisma-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet()); // header keamanan HTTP
  app.use(compression()); // optimasi: gzip respons JSON

  // CORS hanya untuk origin frontend yang terdaftar di .env
  app.enableCors({
    origin: (process.env.CORS_ORIGIN ?? 'http://localhost:5173')
      .split(',')
      .map((o) => o.trim()),
    credentials: true,
  });

  app.setGlobalPrefix('api', { exclude: ['health'] });

  // Validasi DTO global: buang field asing & ubah tipe data otomatis
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new PrismaExceptionFilter());

  const swagger = new DocumentBuilder()
    .setTitle('EchoMarket API')
    .setDescription('REST API marketplace barang daur ulang EchoMarket')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  SwaggerModule.setup(
    'api/docs',
    app,
    SwaggerModule.createDocument(app, swagger),
  );

  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`API berjalan di http://localhost:${port}/api (docs: /api/docs)`);
}
void bootstrap();
