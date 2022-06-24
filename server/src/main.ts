import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import * as cookieParser from 'cookie-parser';
import { UserInterceptor } from './auth/interceptors/user.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import Helmet from 'helmet';
import * as xss from 'xss-clean';

dotenv.config();

(async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(cookieParser());
  app.use(json({ limit: '10kb' }));
  app.use(Helmet());
  app.use(xss());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalInterceptors(new UserInterceptor());

  // Documentation
  const config = new DocumentBuilder()
    .setTitle('SnipBook')
    .setDescription('The SnipBook API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/v1/docs', app, document);

  app.setGlobalPrefix('api/v1');
  await app.listen(process.env.PORT);
})();
