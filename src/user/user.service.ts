import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';
import { SigninUserDto } from './dto/signin-user.dto';
import { User } from './entities/user.entity';
import { Achievement } from 'src/achievements/entities/achievement.entity';
import { Repository } from 'typeorm';
import { AchievementRepository } from 'src/achievements/achievements.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(AchievementRepository)
    private readonly achRepo: AchievementRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    return this.userRepository.createUser(createUserDto);
  }

  async signIn(signinUserDto: SigninUserDto): Promise<string> {
    const { username, password } = signinUserDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await bcrypt.compare(password, user.password))) {
      return 'success';
    } else {
      throw new UnauthorizedException('Please Check your login credentials');
    }
  }

  async userAchievements(id: number) {
    const user = await this.getUserById(id);

     await user.achievement;

     return user;
    // const achievement = await this.achRepo.find({
    //   where: {
    //     user: User,
    //   },
    // });
  }

  async getUserById(id: number): Promise<User> {
    const found = await this.userRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`No Users found with the given id`);
    }
    return found;
  }

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`You are deleting a user that dont exist`);
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserById(id);

    const { firstName, lastName, user_description } = updateUserDto;
    user.firstName = firstName;
    user.lastName = lastName;
    user.user_description = user_description;
    await this.userRepository.save(user);

    return user;
  }
}
