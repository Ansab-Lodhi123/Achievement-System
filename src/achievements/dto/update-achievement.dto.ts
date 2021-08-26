import { PartialType } from '@nestjs/mapped-types';
import { CreateAchievementDto } from './create-achievement.dto';

export class UpdateAchievementDto extends PartialType(CreateAchievementDto) {
  ach_title: string;

  ach_description: string;

  ach_image: string;
}
