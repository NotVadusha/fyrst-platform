import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(userInfo: CreateUserDto) {
    return await this.userRepository.create({ phone_number: null, ...userInfo });
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(userId: number) {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async update(updateInfo: UpdateUserDto, userId: number) {
    return await this.userRepository.update(updateInfo, { where: { id: userId } });
  }

  async delete(userId: number) {
    return await this.userRepository.destroy({ where: { id: userId } });
  }
}
