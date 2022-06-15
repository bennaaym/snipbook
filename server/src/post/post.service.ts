import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreatePostBody, IUpdatePostBody } from './interfaces/post.interface';

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPosts() {
    const allPosts = await this.prismaService.post.findMany({
      select: {
        id: true,
        userId: true,
        title: true,
        description: true,
        tags: true,
        likeCount: true,
        updateAt: true,

        // images: {
        //   select: {
        //     url: true,
        //   },
        //   take: 1,
        // },
      },
      orderBy: [
        {
          updateAt: 'desc',
        },
      ],
    });
    return {
      status: 'success',
      results: allPosts.length,
      data: {
        posts: allPosts,
      },
    };
  }

  async getPostById(id: number) {
    const post = await this.prismaService.post.findUnique({
      select: {
        id: true,
        userId: true,
        title: true,
        description: true,
        tags: true,
        likeCount: true,
        updateAt: true,
      },
      where: { id },
    });

    if (!post)
      throw new HttpException(
        {
          status: 'fail',
          description: `Invalid post id`,
        },
        HttpStatus.NOT_FOUND,
      );

    return {
      status: 'success',
      data: {
        post,
      },
    };
  }

  async createPost({ title, description, tags, images }: ICreatePostBody) {
    // create a new record in the Post table
    const newPost = await this.prismaService.post.create({
      data: {
        title,
        description,
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

  async updatePostById(
    id: number,
    { title, description, tags }: IUpdatePostBody,
  ) {
    // check if there is a record in Post table with the passed id
    const post = await this.prismaService.post.findUnique({ where: { id } });

    if (!post)
      throw new HttpException(
        {
          status: 'fail',
          description: `Invalid post id`,
        },
        HttpStatus.NOT_FOUND,
      );

    // update the record
    const updatedPost = await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        title,
        description,
        tags: tags.length ? tags : post.tags,
        updateAt: new Date(Date.now()),
      },
    });

    return {
      status: 'success',
      data: {
        post: updatedPost,
      },
    };
  }

  async updatePostLikes(id: number) {
    // check if there is a record in Post table with the passed id
    const post = await this.prismaService.post.findUnique({ where: { id } });

    if (!post)
      throw new HttpException(
        {
          status: 'fail',
          description: `Invalid post id`,
        },
        HttpStatus.NOT_FOUND,
      );

    // update the record
    const updatedPost = await this.prismaService.post.update({
      where: {
        id,
      },
      data: {
        likeCount: post.likeCount + 1,
      },
    });

    return {
      status: 'success',
      data: {
        post: updatedPost,
      },
    };
  }

  async deletePostById(id: number) {
    // check if there is a record in Post table with the passed id
    const post = await this.prismaService.post.findUnique({
      where: { id },
    });

    if (!post)
      throw new HttpException(
        {
          status: 'fail',
          message: `Invalid post id`,
        },
        HttpStatus.NOT_FOUND,
      );

    // cascade delete all the images related to the post
    await this.prismaService.image.deleteMany({
      where: {
        postId: id,
      },
    });

    // delete post
    await this.prismaService.post.delete({
      where: {
        id,
      },
    });

    return {
      status: 'success',
      data: null,
    };
  }
}
