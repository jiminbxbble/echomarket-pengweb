import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

const rapikan = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class CreatePostDto {
  @ApiProperty({ example: 'Baru saja mengubah botol bekas jadi pot tanaman!' })
  @Transform(rapikan)
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  teks!: string;

  @ApiPropertyOptional({ type: [String], example: ['/img/post-kerajinan.webp'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  gambar?: string[];
}

export class CreateCommentDto {
  @ApiProperty({ example: 'Keren banget idenya!' })
  @Transform(rapikan)
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  teks!: string;
}

export class QueryPostDto {
  @ApiPropertyOptional({ description: 'Cari postingan berdasarkan teks/penulis' })
  @Transform(rapikan)
  @IsOptional()
  @IsString()
  q?: string;
}
