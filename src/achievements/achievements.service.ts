import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { AchievementRepository } from './achievements.repository';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement } from './entities/achievement.entity';

@Injectable()
export class AchievementsService {
  constructor(
    @InjectRepository(AchievementRepository)
    private readonly achievementRepository: AchievementRepository,
    private readonly userService: UserService,
  ) {}

  async createAchievement(
    createAchievementDto: CreateAchievementDto,
  ): Promise<Achievement> {
    const user = await this.userService.getUserById(
      createAchievementDto.userId,
    );
    const obj = new Achievement();
    obj.ach_title = createAchievementDto.ach_title;
    obj.ach_description = createAchievementDto.ach_description;
    obj.ach_image = createAchievementDto.ach_image;
    obj.user = user;

    return this.achievementRepository.save(obj);
  }

  async getAllAchievement(): Promise<Achievement[]> {
    return await this.achievementRepository.find({ relations: ['user'] });
  }

  async getAchievementById(id: number): Promise<Achievement> {
    const found = await this.achievementRepository.findOne(id, {
      relations: ['user'],
    });

    if (!found) {
      throw new NotFoundException(`Achievement with id=${id} not found`);
    } else {
      return found;
    }
  }

  async updateAchievement(
    id: number,
    updateAchievementDto: UpdateAchievementDto,
  ): Promise<Achievement> {
    const achievement = await this.getAchievementById(id);

    const { ach_title, ach_description, ach_image } = updateAchievementDto;

    achievement.ach_title = ach_title;
    achievement.ach_description = ach_description;
    achievement.ach_image = ach_image;
    await this.achievementRepository.save(achievement);

    return achievement;
  }

  async deleteachievement(id: number) {
    const deleted_achievment = await this.achievementRepository.delete(id);

    if (deleted_achievment.affected === 1) {
      return 'This achievement is deleted';
    } else {
      throw new NotFoundException(
        'You are deleting an achievement that does not exist',
      );
    }
  }
}
