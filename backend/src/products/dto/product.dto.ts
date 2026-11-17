import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsIn,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

const rapikan = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreateProductDto {
  @ApiProperty({ example: 'Tempat pensil dari kardus' })
  @Transform(rapikan)
  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  nama!: string;

  @ApiPropertyOptional()
  @Transform(rapikan)
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  deskripsi?: string;

  @ApiProperty({ example: 10000 })
  @IsInt()
  @Min(0)
  harga!: number;

  @ApiPropertyOptional({ example: 15000 })
  @IsOptional()
  @IsInt()
  @Min(0)
  hargaAwal?: number;

  @ApiPropertyOptional({ example: 50 })
  @IsOptional()
  @IsInt()
  @Min(0)
  stok?: number;

  @ApiPropertyOptional({ example: 'Bandung' })
  @Transform(rapikan)
  @IsOptional()
  @IsString()
  lokasi?: string;

  @ApiPropertyOptional({ example: '/img/produk.webp' })
  @IsOptional()
  @IsString()
  gambar?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  flashSale?: boolean;

  @ApiProperty({ example: 'kardus' })
  @IsString()
  @IsNotEmpty()
  kategoriId!: string;
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

// Query string selalu berupa teks, jadi angka & boolean perlu dikonversi (@Type / @Transform)
export class QueryProductDto {
  @ApiPropertyOptional({ description: 'Cari berdasarkan nama' })
  @Transform(rapikan)
  @IsOptional()
  @IsString()
  q?: string;

  @ApiPropertyOptional({ example: 'kardus' })
  @IsOptional()
  @IsString()
  kategori?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  hargaMin?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  hargaMax?: number;

  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => value === 'true' || value === true)
  @IsBoolean()
  flashSale?: boolean;

  @ApiPropertyOptional({
    enum: ['terbaru', 'termurah', 'termahal', 'terlaris', 'rating'],
  })
  @IsOptional()
  @IsIn(['terbaru', 'termurah', 'termahal', 'terlaris', 'rating'])
  urut?: 'terbaru' | 'termurah' | 'termahal' | 'terlaris' | 'rating';

  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  halaman: number = 1;

  @ApiPropertyOptional({ default: 12 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50) // batasi agar client tidak bisa meminta ribuan baris sekaligus
  perHalaman: number = 12;
}
