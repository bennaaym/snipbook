import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PostModule, PrismaModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
