import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { CustomExceptionFilter } from './error/custom.exception';
import { json } from 'express';
import * as cookieParser from 'cookie-parser';
import { UserInterceptor } from './auth/interceptors/user.interceptor';
dotenv.config();

(async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');

  app.use(cookieParser());
  app.use(json({ limit: '5mb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  // app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalInterceptors(new UserInterceptor());
  await app.listen(process.env.PORT);
})();
