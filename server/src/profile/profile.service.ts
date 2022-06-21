import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { basePostFields } from 'src/post/post.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}

  async getProfileById(id: number) {
    const user = await this.prismaService.user.findUnique({
      select: {
        id: true,
        name: true,
        createdAt: true,
        posts: {
          select: {
            ...basePostFields,
          },
        },
      },
      where: { id },
    });

    if (!user) {
      throw new HttpException(
        { status: 'fail', message: 'Profile Not Found' },
        HttpStatus.NOT_FOUND,
      );
    }

    // get the total likes
    const totalLikes = await this.prismaService.like.findMany({
      where: { userId: id },
    });

    return {
      status: 'success',
      data: {
        profile: {
          ...user,
          totalLikes: totalLikes.length,
        },
      },
    };
  }
}
