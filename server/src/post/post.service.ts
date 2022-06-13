import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreatePostBody } from './interfaces/post.interface';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPosts() {
    const allPosts = await this.prismaService.post.findMany();
    return {
      status: 'success',
      results: allPosts.length,
      data: {
        posts: allPosts,
      },
    };
  }

  async createPost({ title, message, tags, images }: ICreatePostBody) {
    // create a new record in the Post table
    const newPost = await this.prismaService.post.create({
      data: {
        title,
        message,
        tags,
        userId: 1,
      },
    });

    // create new records in the Image table
    await this.prismaService.image.createMany({
      data: images.map((image) => {
        return {
          postId: newPost.id,
          url: image.url,
        };
      }),
    });

    return {
      status: 'success',
      data: {
        post: newPost,
      },
    };
  }
}
