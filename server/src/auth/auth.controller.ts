import {
  Body,
  Controller,
  HttpException,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDto, @Res() response: Response) {
    const res = await this.authService.signup(body);

    if (res instanceof HttpException)
      response.status(res.getStatus()).json(res);
    else {
      response.cookie('jwt', res.refreshToken, {
        maxAge: 24 * 3600 * 1000,
        secure: process.env.NODE_DEV === 'production',
        httpOnly: true,
      });
      response.json(res.json);
    }
  }

  @Post('signin')
  async signin(@Body() body: SignInDto, @Res() response: Response) {
    const res = await this.authService.signin(body);

    if (res instanceof HttpException)
      response.status(res.getStatus()).json(res);
    else {
      response.cookie('jwt', res.refreshToken, {
        maxAge: 24 * 3600 * 1000,
        secure: process.env.NODE_DEV === 'production',
        httpOnly: true,
      });
      response.json(res.json);
    }
  }

  @Post('signout')
  async signout(@Req() request: Request, @Res() response: Response) {
    const refreshToken = request.cookies.jwt;

    await this.authService.signout(refreshToken);

    response.clearCookie('jwt', {
      sameSite: 'none' as 'none',
      secure: process.env.NODE_DEV === 'production',
      httpOnly: true,
    });

    response.status(200).json({
      status: 'success',
      data: null,
    });
  }

  @Post('refresh')
  refresh(@Req() request: Request) {
    const refreshToken = request.cookies.jwt;
    return this.authService.refresh(refreshToken);
  }
}
