import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, UserSaatIni } from '../auth/guards';
import type { UserLogin } from '../auth/jwt.strategy';
import { CartService } from './cart.service';
import { AddToCartDto, UpdateCartDto } from './dto/cart.dto';

@ApiTags('Cart')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
  constructor(private cart: CartService) {}

  @Get()
  @ApiOperation({ summary: 'Ambil daftar item keranjang user' })
  findAll(@UserSaatIni() user: UserLogin) {
    return this.cart.findAll(user.id);
  }

  @Post()
  @ApiOperation({ summary: 'Tambah produk ke keranjang (201)' })
  add(@UserSaatIni() user: UserLogin, @Body() dto: AddToCartDto) {
    return this.cart.add(user.id, dto);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Ubah jumlah item di keranjang' })
  update(
    @UserSaatIni() user: UserLogin,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCartDto,
  ) {
    return this.cart.update(user.id, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Hapus item dari keranjang (204)' })
  remove(
    @UserSaatIni() user: UserLogin,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.cart.remove(user.id, id);
  }
}
