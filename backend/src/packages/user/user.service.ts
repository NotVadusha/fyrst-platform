import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException, Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
@Injectable()
export class UserService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}

  async create(userInfo: CreateUserDto) {
    const sameEmailUser = await this.userRepository.findOne({ where: { email: userInfo.email } });
    if (sameEmailUser) throw new BadRequestException('This email is already in use');
    return await this.userRepository.create({ phone_number: null, ...userInfo });
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
      if (sameEmailUser.id != userId)
        throw new NotAcceptableException('This email is already in use');
    }
    return await this.userRepository.update(updateInfo, { where: { id: userId } });
  }

  async delete(userId: number) {
    return await this.userRepository.destroy({ where: { id: userId } });
  }
  async markEmailAsConfirmed(email: string) {
    return await this.userRepository.update({ is_confirmed: true }, { where: { email: email } });
  }
  async findByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email: email } });
  }
}
