import { Controller, Get, Req } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('')
  hello(@Req() req: any) {
    return `hello from server`;
  }
}
