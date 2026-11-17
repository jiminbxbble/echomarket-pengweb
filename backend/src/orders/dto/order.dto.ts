import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { StatusPesanan } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

const rapikan = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class OrderItemInputDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  productId!: number;

  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  @Max(99)
  jumlah!: number;
}

export class CreateOrderDto {
  @ApiProperty({ example: 'QRIS' })
  @Transform(rapikan)
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  metodeBayar!: string;

  @ApiProperty({ example: 'Jl. Telekomunikasi No. 1, Bojongsoang, Bandung' })
  @Transform(rapikan)
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  alamatKirim!: string;

  @ApiPropertyOptional({ example: 6500, default: 0 })
  @IsOptional()
  @IsInt()
  @Min(0)
  ongkir: number = 0;

  @ApiPropertyOptional({
    type: [OrderItemInputDto],
    description:
      'Opsional. Jika dikosongkan, checkout menggunakan seluruh isi keranjang.',
  })
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OrderItemInputDto)
  items?: OrderItemInputDto[];
}

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: StatusPesanan, example: StatusPesanan.DIBAYAR })
  @IsEnum(StatusPesanan)
  status!: StatusPesanan;
}
