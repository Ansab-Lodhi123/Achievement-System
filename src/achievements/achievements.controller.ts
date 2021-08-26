import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AchievementsService } from './achievements.service';
import { CreateAchievementDto } from './dto/create-achievement.dto';
import { UpdateAchievementDto } from './dto/update-achievement.dto';
import { Achievement } from './entities/achievement.entity';

@Controller('achievements')
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Post()
  createAchievement(
    @Body() createAchievementDto: CreateAchievementDto,
  ): Promise<Achievement> {
    return this.achievementsService.createAchievement(createAchievementDto);
  }

  @Get()
  getAllAchievement(): Promise<Achievement[]> {
    return this.achievementsService.getAllAchievement();
  }

  @Get(':id')
  getAchievementById(@Param('id') id: number): Promise<Achievement> {
    return this.achievementsService.getAchievementById(id);
  }

  @Patch(':id')
  updateAchievement(
    @Param('id') id: number,
    @Body() updateAchievementDto: UpdateAchievementDto,
  ): Promise<Achievement> {
    return this.achievementsService.updateAchievement(id, updateAchievementDto);
  }

  @Delete(':id')
  deleteAchievement(@Param('id') id: number) {
    return this.achievementsService.deleteachievement(id);
  }
}
