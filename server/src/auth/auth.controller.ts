import { Controller, Post, Body, Res, Req, Get, UseGuards } from '@nestjs/common';
import type { Response, Request } from 'express';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { signToken } from '../utils/jwt.util';
import { COOKIE_NAME } from '../common/constants';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignupDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.signup(dto.email, dto.name, dto.password);
    const token = signToken((user as any)._id);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return { user };
  }

  @Post('signin')
  async signin(@Body() dto: SigninDto, @Res({ passthrough: true }) res: Response) {
    const user = await this.authService.validateUser(dto.email, dto.password);
    if (!user) return { message: 'Invalid credentials' };
    const token = signToken((user as any)._id);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 *  24 * 60 * 60 * 1000,
    });
    return { user };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie(COOKIE_NAME, { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production' });
    return { message: 'Logged out' };
  }

  @Get('check')
  @UseGuards(AuthGuard('jwt-cookie'))
  check(@Req() req: Request) {
    return { isLoggedIn: true };
  }
}
