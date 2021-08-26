import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.createComment(createCommentDto);
  }

  @Get()
  getAllComments(): Promise<Comment[]> {
    return this.commentsService.getAllComments();
  }

  @Get(':id')
  getCommentById(@Param('id') id: number): Promise<Comment> {
    return this.commentsService.getCommentById(id);
  }

  @Patch(':id')
  updateComment(
    @Param('id') id: number,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentsService.updateComment(id, updateCommentDto);
  }

  @Delete(':id')
  deleteComment(@Param('id') id: number) {
    return this.commentsService.deleteComment(id);
  }
}
