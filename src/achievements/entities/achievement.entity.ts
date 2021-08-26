import { Comment } from 'src/comments/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn()
  ach_id: number;

  @Column()
  ach_title: string;

  @Column()
  ach_description: string;

  @Column({ nullable: true })
  ach_image: string;

  @ManyToOne(() => User, (user) => user.achievement, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.achievement)
  comment: Comment[];
}
