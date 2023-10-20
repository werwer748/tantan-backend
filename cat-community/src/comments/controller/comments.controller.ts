import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { CommentsCreateDto } from 'src/comments/dto/comments.create.dto';
import { CommentsService } from 'src/comments/service/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsServies: CommentsService) {}

  @ApiOperation({ summary: '모든 고양이 프로필에 적힌 댓글 가져오기' })
  @Get()
  async getAllComments() {
    return this.commentsServies.getAllComments();
  }

  @ApiOperation({ summary: '특정 고양이 프로필에 댓글 남기기' })
  @Post(':id') // POST comments/:id
  async createComment(
    @Param('id') id: string,
    @Body() body: CommentsCreateDto,
  ) {
    return this.commentsServies.createComment(id, body);
  }

  @ApiOperation({ summary: '좋아요 수 올리기' })
  @Patch(':id')
  async plusLike(@Param('id') id: string) {
    return this.commentsServies.plusLike(id);
  }
}
