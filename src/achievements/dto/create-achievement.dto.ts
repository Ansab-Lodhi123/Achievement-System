import { IsInt, IsNumber, IsNumberString, IsString } from 'class-validator';

export class CreateAchievementDto {
  @IsString()
  ach_title: string;

  @IsString()
  ach_description: string;

  @IsString()
  ach_image: string;

  @IsNumberString()
  userId: number;
}
