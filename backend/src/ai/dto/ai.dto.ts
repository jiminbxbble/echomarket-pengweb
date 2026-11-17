import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

const rapikan = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;

export class ChatHistoryItemDto {
  @ApiProperty({ enum: ['user', 'assistant'] })
  @IsIn(['user', 'assistant'])
  role!: 'user' | 'assistant';

  @ApiProperty()
  @IsString()
  @MaxLength(2000)
  content!: string;
}

export class ChatRequestDto {
  @ApiProperty({
    example: 'Rekomendasikan produk daur ulang dari kardus di bawah Rp 20.000',
  })
  @Transform(rapikan)
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  message!: string;

  @ApiPropertyOptional({ type: [ChatHistoryItemDto] })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ChatHistoryItemDto)
  history?: ChatHistoryItemDto[];
}
