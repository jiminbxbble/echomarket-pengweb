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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Roles, RolesGuard, UserSaatIni } from '../auth/guards';
import type { UserLogin } from '../auth/jwt.strategy';
import {
  CreateProductDto,
  QueryProductDto,
  UpdateProductDto,
} from './dto/product.dto';
import { ProductsService } from './products.service';

@ApiTags('Products')
@Controller()
export class ProductsController {
  constructor(private products: ProductsService) {}

  @Get('categories')
  @ApiOperation({ summary: 'Daftar kategori beserta jumlah produk' })
  kategori() {
    return this.products.kategori();
  }

  @Get('products')
  @ApiOperation({ summary: 'Daftar produk (filter, urut, pagination)' })
  findAll(@Query() query: QueryProductDto) {
    return this.products.findAll(query);
  }

  @Get('products/:id')
  @ApiOperation({ summary: 'Detail produk' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.products.findOne(id);
  }

  @Post('products')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tambah produk (ADMIN) - 201' })
  create(@Body() dto: CreateProductDto, @UserSaatIni() user: UserLogin) {
    return this.products.create(dto, user.id);
  }

  @Patch('products/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Ubah sebagian data produk (ADMIN)' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateProductDto) {
    return this.products.update(id, dto);
  }

  @Delete('products/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @HttpCode(HttpStatus.NO_CONTENT) // 204: berhasil, tanpa body
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Hapus produk (ADMIN) - 204' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.products.remove(id);
  }
}
