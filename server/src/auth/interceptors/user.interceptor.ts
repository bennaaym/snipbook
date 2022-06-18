import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as JWT from 'jsonwebtoken';

@Injectable()
export class UserInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();
    let token = request.headers?.authorization?.split(' ')[1];
    if (!token) {
      token = request.cookies?.jwt;
    }
    const user = JWT.decode(token);
    request.user = user;
    return next.handle();
  }
}
