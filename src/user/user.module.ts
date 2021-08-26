import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AchievementRepository } from 'src/achievements/achievements.repository';
import { AchievementsService } from 'src/achievements/achievements.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserRepository, AchievementRepository])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
