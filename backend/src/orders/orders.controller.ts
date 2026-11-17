import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, UserSaatIni } from '../auth/guards';
import type { UserLogin } from '../auth/jwt.strategy';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/order.dto';
import { OrdersService } from './orders.service';

@ApiTags('Orders')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('orders')
export class OrdersController {
  constructor(private orders: OrdersService) {}

  @Get()
  @ApiOperation({ summary: 'Riwayat pesanan user yang sedang login' })
  findAll(@UserSaatIni() user: UserLogin) {
    return this.orders.findAll(user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Detail pesanan' })
  findOne(
    @UserSaatIni() user: UserLogin,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.orders.findOne(user.id, user.role, id);
  }

  @Post()
  @ApiOperation({ summary: 'Buat pesanan / checkout (201)' })
  create(@UserSaatIni() user: UserLogin, @Body() dto: CreateOrderDto) {
    return this.orders.create(user.id, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Perbarui status pesanan (misal konfirmasi bayar)' })
  updateStatus(
    @UserSaatIni() user: UserLogin,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.orders.updateStatus(user.id, user.role, id, dto);
  }
}
