import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ICreatePostBody, IUpdatePostBody } from './interfaces/post.interface';

export const basePostFields = {
  id: true,
  userId: true,
  title: true,
  description: true,
  tags: true,
  likes: {
    select: {
      id: true,
      userId: true,
      createdAt: true,
    },
  },
  updatedAt: true,
};

@Injectable()
export class PostService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllPosts() {
    const allPosts = await this.prismaService.post.findMany({
      select: {
        ...basePostFields,
      },
      orderBy: [
        {
          updatedAt: 'desc',
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
        ...basePostFields,
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

  async createPost(
    { title, description, tags, images }: ICreatePostBody,
    userId: number,
  ) {
    // create a new record in the Post table
    const newPost = await this.prismaService.post.create({
      select: {
        ...basePostFields,
      },

      data: {
        title,
        description,
        tags,
        userId,
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
    userId: number,
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

    // check if the user owns the post
    if (post.userId !== userId) {
      throw new HttpException(
        {
          status: 'fail',
          message: 'Unauthenticated User',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

    // update the record
    const updatedPost = await this.prismaService.post.update({
      select: {
        ...basePostFields,
      },
      where: {
        id,
      },
      data: {
        title,
        description,
        tags: tags.length ? tags : post.tags,
        updatedAt: new Date(Date.now()),
      },
    });

    return {
      status: 'success',
      data: {
        post: updatedPost,
      },
    };
  }

  async updatePostLikes(id: number, userId: number) {
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

    // check if the user liked the post before
    const like = await this.prismaService.like.findFirst({
      where: {
        postId: id,
        userId,
      },
    });

    // user didn't like the post before
    let updatedPost;
    if (!like) {
      // add new record to like table
      await this.prismaService.like.create({
        data: {
          postId: id,
          userId,
        },
      });

      updatedPost = await this.prismaService.post.findUnique({
        select: {
          ...basePostFields,
        },
        where: {
          id,
        },
      });
    } else {
      // delete the like record
      await this.prismaService.like.deleteMany({
        where: {
          postId: id,
          userId,
        },
      });

      // delete the like
      updatedPost = await this.prismaService.post.findUnique({
        select: {
          ...basePostFields,
        },
        where: {
          id,
        },
      });
    }

    return {
      status: 'success',
      data: {
        post: updatedPost,
      },
    };
  }

  async deletePostById(id: number, userId: number) {
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

    // check if the user owns the post
    if (post.userId !== userId) {
      throw new HttpException(
        {
          status: 'fail',
          message: 'Unauthenticated User',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }

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
