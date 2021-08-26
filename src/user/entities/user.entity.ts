import { Achievement } from 'src/achievements/entities/achievement.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  user_image: string;

  @Column()
  user_description: string;

  @OneToMany(() => Achievement, (achievement) => achievement.user, {
    lazy: true,
  })
  achievement: Achievement[];

  @OneToMany(() => Comment, (comment) => comment.comment_by_user)
  comment: Comment[];
}
