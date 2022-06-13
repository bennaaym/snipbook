import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [PostModule, PrismaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
