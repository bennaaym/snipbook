import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ISignIn, ISignUp } from './interfaces/auth.interface';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';
import { Request, Response } from 'express';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup({ name, email, password }: ISignUp) {
    // check if there is no user with the same email
    const user = await this.prismaService.user.findUnique({ where: { email } });

    if (user) {
      return new HttpException(
        { status: 'fail', message: 'Invalid Email' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // hash the password
    const hashedPassword = await bcrypt.hash(password, 13);

    // create new user
    const newUser = await this.prismaService.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        name: true,
      },
    });

    // generate a jwt token and send response
    return await this.createSendToken(newUser);
  }

  async signin({ email, password }: ISignIn) {
    // check if there is a user assigned to the submitted email
    const user = await this.prismaService.user.findUnique({
      select: { id: true, name: true, password: true },
      where: { email },
    });

    if (!user) {
      return new HttpException(
        { status: 'fail', message: 'Invalid Credentials ' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // check if the password is correct
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return new HttpException(
        { status: 'fail', message: 'Invalid Credentials ' },
        HttpStatus.BAD_REQUEST,
      );
    }

    // generate a jwt token and send response
    return await this.createSendToken(user);
  }

  signout(response: Response) {
    // response.cookie('jwt', '', { maxAge: 1 });
    const cookieConfig = {
      sameSite: 'none' as 'none',
      secure: process.env.NODE_DEV === 'production',
      httpOnly: true,
    };
    response.clearCookie('jwt', cookieConfig);
    response.status(200).json({
      status: 'success',
      data: null,
    });
  }

  refresh(request: Request) {
    // verify token
    const token = request.cookies.jwt;
    if (!token) throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);

    const payload = JWT.verify(token, process.env.JWT_SECRET) as {
      id: number;
      name: string;
    };
    if (!payload)
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);

    // generate a new token
    return this.createSendToken(payload);
  }

  private async signToken(payload: { id: number; name: string }) {
    return await JWT.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  }

  private async createSendToken(user: { id: number; name: string }) {
    const token = await this.signToken({
      id: user.id,
      name: user.name,
    });

    return {
      status: 'success',
      token,
    };
  }
}
