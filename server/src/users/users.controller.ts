import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import {JwtCookieAuthGuard} from "../auth/guards/jwt-auth.guard"
import { UsersService } from './users.service';

@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtCookieAuthGuard)
  async getProtected(@Req() req: any) {
  return  await this.usersService.findById(req.user.userId);
  }
}