import { Body, Controller, Post, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dtos/auth.dto';
import { AuthInterceptor } from './interceptors/auth.interceptor';

@UseInterceptors(AuthInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignUpDto) {
    return this.authService.signup(body);
  }

  @Post('signin')
  signin(@Body() body: SignInDto) {
    return this.authService.signin(body);
  }

  @Post('signout')
  signout(@Res() response: Response) {
    return this.authService.signout(response);
  }
}
