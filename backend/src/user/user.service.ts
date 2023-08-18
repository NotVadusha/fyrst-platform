import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './entities';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create() {
    return 1;
  }

  async findAll() {
    return 2;
  }

  async findOne() {
    return 3;
  }

  async update() {
    return 4;
  }

  async remove() {
    return 5;
  }
}
