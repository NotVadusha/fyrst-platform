import { CreateUserDto } from './dto/create-user.dto';
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async create(userInfo: CreateUserDto) {
    const sameEmailUser = await this.userRepository.findOne({ where: { email: userInfo.email } });
    if (sameEmailUser) throw new BadRequestException('This email is already in use');
    const role = await this.rolesService.findOne(userInfo.role_id);
    if (!role) throw new NotFoundException("This role doesn't exist");
    return await this.userRepository.create({
      phone_number: null,
      role_id: userInfo.role_id,
      ...userInfo,
    });
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(userId: number) {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async update(updateInfo: UpdateUserDto, userId: number) {
    if (updateInfo.email) {
      const sameEmailUser = await this.userRepository.findOne({
        where: { email: updateInfo.email },
      });
      if (sameEmailUser && sameEmailUser.id !== userId)
        throw new NotAcceptableException('This email is already in use');
    }
    if (updateInfo.role_id) {
      const role = await this.rolesService.findOne(updateInfo?.role_id);
      if (!role) throw new NotFoundException("This role doesn't exist");
    }

    return await this.userRepository.update(updateInfo, { where: { id: userId } });
  }

  async delete(userId: number) {
    return await this.userRepository.destroy({ where: { id: userId } });
  }
}
