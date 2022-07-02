import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ISignIn, ISignUp } from './interfaces/auth.interface';
import * as bcrypt from 'bcrypt';
import * as JWT from 'jsonwebtoken';

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
    const refreshToken = await this.createSaveRefreshToken(newUser);

    return {
      json: this.createSendAccessToken(newUser),
      refreshToken,
    };
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
    const refreshToken = await this.createSaveRefreshToken(user);

    return {
      json: this.createSendAccessToken(user),
      refreshToken,
    };
  }

  async signout(refreshToken: string) {
    if (!refreshToken) return;

    const { id } = JWT.decode(refreshToken) as { id: number; name: string };
    const user = await this.prismaService.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) return;

    await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        refreshToken: '',
      },
    });
  }

  async refresh(refreshToken: string) {
    // verify token
    if (!refreshToken)
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);

    const payload = JWT.verify(
      refreshToken,
      process.env.JWT_REFRESH_TOKEN_SECRET,
    ) as {
      id: number;
      name: string;
    };
    if (!payload)
      throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);

    const { id } = JWT.decode(refreshToken) as { id: number; name: string };

    const user = await this.prismaService.user.findFirst({
      where: {
        id,
        refreshToken,
      },
    });

    if (!user) throw new HttpException('Invalid Token', HttpStatus.FORBIDDEN);

    // generate a new token
    return this.createSendAccessToken(payload);
  }

  private signAccessToken(payload: { id: number; name: string }) {
    return JWT.sign(payload, process.env.JWT_ACCESS_TOKEN_SECRET, {
      expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
    });
  }

  private signRefreshToken(payload: { id: number; name: string }) {
    return JWT.sign(payload, process.env.JWT_REFRESH_TOKEN_SECRET, {
      expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
    });
  }

  private async createSaveRefreshToken(user: { id: number; name: string }) {
    const refreshToken = this.signRefreshToken({
      id: user.id,
      name: user.name,
    });

    await this.prismaService.user.update({
      where: {
        id: user.id,
      },
      data: {
        refreshToken,
      },
    });

    return refreshToken;
  }

  private createSendAccessToken(user: { id: number; name: string }) {
    const accessToken = this.signAccessToken({
      id: user.id,
      name: user.name,
    });

    return {
      status: 'success',
      accessToken,
    };
  }
}
