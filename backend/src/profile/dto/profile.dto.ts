import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

const rapikan = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: 'Thoriq Ahmad' })
  @Transform(rapikan)
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nama?: string;

  @ApiPropertyOptional({ example: '081234567890' })
  @Transform(rapikan)
  @IsOptional()
  @IsString()
  @MaxLength(30)
  telepon?: string;

  @ApiPropertyOptional({ example: '/img/avatar-saya.webp' })
  @Transform(rapikan)
  @IsOptional()
  @IsString()
  @MaxLength(300)
  avatar?: string;
}

export class CreateAddressDto {
  @ApiProperty({ example: 'Rumah' })
  @Transform(rapikan)
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  label!: string;

  @ApiProperty({ example: 'Thoriq' })
  @Transform(rapikan)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  penerima!: string;

  @ApiProperty({ example: '081234567890' })
  @Transform(rapikan)
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  telepon!: string;

  @ApiProperty({ example: 'Jawa Barat' })
  @Transform(rapikan)
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  provinsi!: string;

  @ApiProperty({ example: 'Kab. Bandung' })
  @Transform(rapikan)
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  kota!: string;

  @ApiPropertyOptional({ example: 'Bojongsoang' })
  @Transform(rapikan)
  @IsOptional()
  @IsString()
  @MaxLength(80)
  kecamatan?: string;

  @ApiProperty({ example: 'Jl. Telekomunikasi No. 1' })
  @Transform(rapikan)
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  detail!: string;

  @ApiPropertyOptional({ default: false })
  @IsOptional()
  @IsBoolean()
  utama?: boolean;
}

export class UpdateAddressDto extends PartialType(CreateAddressDto) {}
