import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    try {
      // verify jwt token
      const request = context.switchToHttp().getRequest();
      const token = request.headers.authorization?.split(' ')[1];
      const { id } = JWT.verify(token, process.env.JWT_SECRET) as {
        id: number;
      };
      // find user with the specific id save in the token
      const user = await this.prismaService.user.findUnique({ where: { id } });
      if (!user) {
        throw new Error();
      }
      request.userId = { id };
      return true;
    } catch (err) {
      throw new HttpException(
        {
          status: 'fail',
          message: 'Unauthenticated User',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
