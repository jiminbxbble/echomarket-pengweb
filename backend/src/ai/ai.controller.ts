import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Throttle } from '@nestjs/throttler';
import { AiService } from './ai.service';
import { ChatRequestDto } from './dto/ai.dto';

@ApiTags('AI (EchoBot)')
@Controller('ai')
export class AiController {
  constructor(private ai: AiService) {}

  @Post('chat')
  @HttpCode(HttpStatus.OK)
  @Throttle({ default: { limit: 20, ttl: 60_000 } })
  @ApiOperation({ summary: 'Chat dengan EchoBot AI (Groq + konteks produk)' })
  chat(@Body() dto: ChatRequestDto) {
    return this.ai.chat(dto);
  }
}
