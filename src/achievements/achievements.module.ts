import { Module } from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { AchievementsController } from './achievements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AchievementRepository } from './achievements.repository';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([AchievementRepository, UserRepository])],
  controllers: [AchievementsController],
  providers: [AchievementsService, UserService],
})
export class AchievementsModule {}
