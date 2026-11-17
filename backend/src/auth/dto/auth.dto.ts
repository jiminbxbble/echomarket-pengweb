import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

// Sanitasi: buang spasi di awal/akhir dan samakan email jadi huruf kecil
const rapikan = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim() : value;
const emailKecil = ({ value }: { value: unknown }) =>
  typeof value === 'string' ? value.trim().toLowerCase() : value;

export class RegisterDto {
  @ApiProperty({ example: 'Thoriq' })
  @Transform(rapikan)
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  nama!: string;

  @ApiProperty({ example: 'thoriq@contoh.com' })
  @Transform(emailKecil)
  @IsEmail({}, { message: 'Format email tidak valid' })
  email!: string;

  @ApiProperty({ example: 'rahasia123', minLength: 8 })
  @IsString()
  @MinLength(8, { message: 'Password minimal 8 karakter' })
  @MaxLength(72) // batas bcrypt
  password!: string;
}

export class LoginDto {
  @ApiProperty({ example: 'thoriq@contoh.com' })
  @Transform(emailKecil)
  @IsEmail({}, { message: 'Format email tidak valid' })
  email!: string;

  @ApiProperty({ example: 'rahasia123' })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
