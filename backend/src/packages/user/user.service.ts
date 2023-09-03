import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
import { UserFiltersDto } from './dto/user-filters.dto';
import { Op } from 'sequelize';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
  ) {}

  async create(userInfo: CreateUserDto) {
    const sameEmailUser = await this.userRepository.findOne({ where: { email: userInfo.email } });
    if (sameEmailUser)
      throw new BadRequestException(`email ${sameEmailUser.email} is already in use`);
    const role = await this.rolesService.findOne(userInfo.role_id);
    if (!role) throw new NotFoundException("This role doesn't exist");
    return await this.userRepository.create({
      phone_number: null,
      is_confirmed: false,
      ...userInfo,
    });
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async createMany(userInfo: CreateUserDto[]) {
    const createPromises = userInfo.map(user => this.create(user));
    return await Promise.all(createPromises);
  }

  async getAllByParams({
    currentPage,
    filters,
  }: {
    currentPage: number;
    filters: Omit<UserFiltersDto, 'currentPage'>;
  }) {
    Object.keys(filters).forEach(
      key =>
        (filters[key] === undefined || (typeof filters[key] !== 'string' && isNaN(filters[key]))) &&
        delete filters[key],
    );

    // Number of users to show per page
    const limit = 5;

    // To skip per page
    const offset = typeof currentPage === 'number' ? (currentPage - 1) * limit : 0;

    const opSubstringFilters = {
      ...(filters.first_name && {
        first_name: {
          [Op.substring]: filters.first_name ?? '',
          [Op.substring]: filters.first_name,
        },
      }),
      ...(filters.last_name && {
        last_name: {
          [Op.substring]: filters.last_name ?? '',
          [Op.substring]: filters.last_name,
        },
      }),
      ...(filters.email && {
        email: {
          [Op.substring]: filters.email ?? '',
          [Op.substring]: filters.email,
        },
      }),
      ...(filters.city && {
        city: {
          [Op.substring]: filters.city ?? '',
          [Op.substring]: filters.city,
        },
      }),
    };

    const users = await this.userRepository.findAll({
      order: [['id', 'DESC']],
      where: {
        ...filters,
        ...opSubstringFilters,
      },
      limit,
      offset,
    });

    const totalCount = await this.userRepository.count({
      where: {
        ...filters,
        ...opSubstringFilters,
      },
    });

    return { users, totalCount };
  }

  async findOne(userId: number) {
    return await this.userRepository.findOne({ where: { id: userId } });
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async update(updateInfo: UpdateUserDto, userId: number) {
    if (updateInfo.role_id) {
      const role = await this.rolesService.findOne(updateInfo.role_id);
      if (!role) throw new NotFoundException("This role doesn't exist");
    }
    const [updatedUser] = await this.userRepository.update(updateInfo, { where: { id: userId } });
    if (!updatedUser) throw new NotFoundException('User do not exist');
    return updatedUser;
  }
  async changePassword(userId: number, currentPassword: string, newPassword: string) {
    const user = await this.findOne(userId);
    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) throw new BadRequestException('Current password is incorrect');

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    return this.update({ password: hashedNewPassword }, userId);
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
