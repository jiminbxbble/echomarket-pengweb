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
import {
  CreateAddressDto,
  UpdateAddressDto,
  UpdateProfileDto,
} from './dto/profile.dto';
import { ProfileService } from './profile.service';

@ApiTags('Profile & Addresses')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller()
export class ProfileController {
  constructor(private profile: ProfileService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Ambil profil user beserta daftar alamat' })
  getProfile(@UserSaatIni() user: UserLogin) {
    return this.profile.getProfile(user.id);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Perbarui profil user' })
  updateProfile(
    @UserSaatIni() user: UserLogin,
    @Body() dto: UpdateProfileDto,
  ) {
    return this.profile.updateProfile(user.id, dto);
  }

  @Get('addresses')
  @ApiOperation({ summary: 'Daftar alamat pengiriman user' })
  listAddresses(@UserSaatIni() user: UserLogin) {
    return this.profile.listAddresses(user.id);
  }

  @Post('addresses')
  @ApiOperation({ summary: 'Tambah alamat pengiriman baru (201)' })
  createAddress(
    @UserSaatIni() user: UserLogin,
    @Body() dto: CreateAddressDto,
  ) {
    return this.profile.createAddress(user.id, dto);
  }

  @Patch('addresses/:id')
  @ApiOperation({ summary: 'Ubah alamat pengiriman' })
  updateAddress(
    @UserSaatIni() user: UserLogin,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAddressDto,
  ) {
    return this.profile.updateAddress(user.id, id, dto);
  }

  @Delete('addresses/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Hapus alamat pengiriman (204)' })
  removeAddress(
    @UserSaatIni() user: UserLogin,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.profile.removeAddress(user.id, id);
  }
}
