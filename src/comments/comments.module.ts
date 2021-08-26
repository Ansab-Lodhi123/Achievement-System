import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { AchievementsService } from 'src/achievements/achievements.service';
import { AchievementRepository } from 'src/achievements/achievements.repository';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentRepository,
      AchievementRepository,
      UserRepository,
    ]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService, AchievementsService, UserService],
})
export class CommentsModule {}
