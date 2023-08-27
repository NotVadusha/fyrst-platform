import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
import { UserFiltersDto } from './dto/user-filters.dto';
import { Op } from 'sequelize';

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
    console.log("creating");
    return await this.userRepository.create({
      phone_number: null,
      is_confirmed: false,
      ...userInfo,
    });
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

    const users = await this.userRepository.findAll({
      where: {
        ...filters,
        first_name: {
          [Op.substring]: filters.first_name ?? '',
        },
        last_name: {
          [Op.substring]: filters.last_name ?? '',
        },
        email: {
          [Op.substring]: filters.email ?? '',
        },
        city: {
          [Op.substring]: filters.city ?? '',
        },       
      },
      limit,
      offset,
    });

    const totalCount = await this.userRepository.count({
      where: {
        ...filters,
        first_name: {
          [Op.substring]: filters.first_name ?? '',
        },
        last_name: {
          [Op.substring]: filters.last_name ?? '',
        },
        email: {
          [Op.substring]: filters.email ?? '',
        },
        city: {
          [Op.substring]: filters.city ?? '',
        },
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
    const role = await this.rolesService.findOne(updateInfo?.role_id);
    if (!role) throw new NotFoundException("This role doesn't exist");
    const [updatedUser] = await this.userRepository.update(updateInfo, { where: { id: userId } });
    if (!updatedUser) throw new NotFoundException('User do not exist');
    return updatedUser;
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
