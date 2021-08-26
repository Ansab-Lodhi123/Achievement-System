import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AchievementsService } from 'src/achievements/achievements.service';
import { UserService } from 'src/user/user.service';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentRepository)
    private readonly commentRepository: CommentRepository,
    private readonly achievementService: AchievementsService,
    private readonly userService: UserService,
  ) {}

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const achievement = await this.achievementService.getAchievementById(
      createCommentDto.achievementId,
    );

    const commentbyuser = await this.userService.getUserById(
      createCommentDto.userId,
    );

    const obj = new Comment();

    obj.comment_description = createCommentDto.comment_description;
    obj.comment_image = createCommentDto.comment_image;
    obj.achievement = achievement;
    obj.comment_by_user = commentbyuser;

    return await this.commentRepository.save(obj);
  }

  async getAllComments(): Promise<Comment[]> {
    return await this.commentRepository.find({
      relations: ['achievement', 'comment_by_user'],
    });
  }

  async getCommentById(id: number): Promise<Comment> {
    const found = await this.commentRepository.findOne(id, {
      relations: ['achievement'],
    });
    if (!found) {
      throw new NotFoundException('Comment does not exist');
    } else {
      return found;
    }
  }

  async updateComment(
    id: number,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.getCommentById(id);

    const { comment_description, comment_image } = updateCommentDto;

    comment.comment_description = comment_description;
    comment.comment_image = comment_image;

    await this.commentRepository.save(comment);

    return comment;
  }

  async deleteComment(id: number) {
    const deleted_comment = await this.commentRepository.delete(id);

    if (deleted_comment.affected === 1) {
      return 'This comment is deleted';
    } else {
      throw new NotFoundException(
        'You are deleting a comment that does not exist',
      );
    }
  }
}
