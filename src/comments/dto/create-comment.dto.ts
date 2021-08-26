import { IsNumberString, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  comment_description: string;

  @IsString()
  comment_image: string;

  @IsNumberString()
  achievementId: number;

  @IsNumberString()
  userId: number;
}
