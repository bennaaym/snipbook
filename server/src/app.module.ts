import { Module } from '@nestjs/common';
import { PostModule } from './post/post.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [PostModule, PrismaModule, AuthModule, ProfileModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
