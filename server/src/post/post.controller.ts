import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/auth/decorators/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
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
  @UseGuards(AuthGuard)
  createPost(
    @Body() body: CreatePostDto,
    @User() { id: userId }: { id: number },
  ) {
    return this.postService.createPost(body, userId);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  updatePostById(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdatePostDto,
    @User() { id: userId }: { id: number },
  ) {
    return this.postService.updatePostById(id, body, userId);
  }

  @Patch(':id/likes')
  @UseGuards(AuthGuard)
  updatePostLikes(
    @Param('id') id: number,
    @User() { id: userId }: { id: number },
  ) {
    return this.postService.updatePostLikes(id, userId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  deletePostById(
    @Param('id', ParseIntPipe) id: number,
    @User() { id: userId }: { id: number },
  ) {
    return this.postService.deletePostById(id, userId);
  }
}
