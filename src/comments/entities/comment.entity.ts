import { Achievement } from 'src/achievements/entities/achievement.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  comment_id: number;

  @Column()
  comment_description: string;

  @Column({ nullable: true })
  comment_image: string;

  @ManyToOne(() => Achievement, (achievement) => achievement.comment, {
    onDelete: 'CASCADE',
  })
  achievement: Achievement;

  @ManyToOne(() => User, (user) => user.comment)
  comment_by_user: User;
}
