import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, Max, Min } from 'class-validator';

export class AddToCartDto {
  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(1)
  productId!: number;

  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(99)
  jumlah: number = 1;
}

export class UpdateCartDto {
  @ApiProperty({ example: 2 })
  @IsInt()
  @Min(1)
  @Max(99)
  jumlah!: number;
}
