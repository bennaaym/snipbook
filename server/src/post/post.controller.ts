import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDto, UpdatePostDto } from './dtos/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.getPostById(id);
  }

  @Post()
  createPost(@Body() body: CreatePostDto) {
    return this.postService.createPost(body);
  }

  @Patch(':id')
  updatePostById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostDto,
  ) {
    return this.postService.updatePostById(id, body);
  }

  @Patch(':id/likes')
  updatePostLikes(@Param('id') id: number) {
    return this.postService.updatePostLikes(id);
  }

  @Delete(':id')
  deletePostById(@Param('id', ParseIntPipe) id: number) {
    return this.postService.deletePostById(id);
  }
}
