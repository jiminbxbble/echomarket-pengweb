import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, UserSaatIni } from '../auth/guards';
import type { UserLogin } from '../auth/jwt.strategy';
import { CommunityService } from './community.service';
import {
  CreateCommentDto,
  CreatePostDto,
  QueryPostDto,
} from './dto/community.dto';

@ApiTags('Community')
@Controller('community')
export class CommunityController {
  constructor(private community: CommunityService) {}

  @Get('posts')
  @ApiOperation({ summary: 'Daftar postingan Echomunitas beserta komentar' })
  listPosts(@Query() query: QueryPostDto) {
    return this.community.listPosts(query);
  }

  @Post('posts')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Buat postingan baru di Echomunitas (201)' })
  createPost(@UserSaatIni() user: UserLogin, @Body() dto: CreatePostDto) {
    return this.community.createPost(user.id, dto);
  }

  @Post('posts/:id/like')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Sukai postingan Echomunitas' })
  likePost(@Param('id', ParseIntPipe) id: number) {
    return this.community.likePost(id);
  }

  @Post('posts/:id/comments')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Tambah komentar pada postingan (201)' })
  addComment(
    @UserSaatIni() user: UserLogin,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateCommentDto,
  ) {
    return this.community.addComment(user.id, id, dto);
  }

  @Get('tutorials')
  @ApiOperation({ summary: 'Daftar tutorial daur ulang' })
  listTutorials() {
    return this.community.listTutorials();
  }
}
