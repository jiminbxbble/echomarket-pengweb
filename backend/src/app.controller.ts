import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class AppController {
  // Dipakai Render untuk health check
  @Get('health')
  health() {
    return { status: 'ok', waktu: new Date().toISOString() };
  }
}
