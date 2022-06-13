import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreatePostDto } from './dtos/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Post()
  createPost(@Body() body: CreatePostDto) {
    return this.postService.createPost(body);
  }
}
