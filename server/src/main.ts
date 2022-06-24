import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import * as cookieParser from 'cookie-parser';
import { UserInterceptor } from './auth/interceptors/user.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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
  app.useGlobalInterceptors(new UserInterceptor());

  const config = new DocumentBuilder()
    .setTitle('SnipBook')
    .setDescription('The SnipBook API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('v1/api/docs', app, document);

  await app.listen(process.env.PORT);
})();
