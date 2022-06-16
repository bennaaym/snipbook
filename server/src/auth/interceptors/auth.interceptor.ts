import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data?.token) {
          const response: Response = context.switchToHttp().getResponse();
          const cookieConfig = {
            expires: new Date(Date.now() + 3 * 24 * 3600 * 1000),
            secure: process.env.NODE_DEV === 'production',
            httpOnly: true,
          };
          response.cookie('jwt', data.token, cookieConfig);
        }
        return data;
      }),
    );
  }
}
