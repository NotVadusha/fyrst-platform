import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
import { UserFiltersDto } from './dto/user-filters.dto';
import { Op } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import * as Papa from 'papaparse';

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
    console.log('creating');
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
    isCSVExport = false,
  }: {
    currentPage: number;
    filters: Omit<UserFiltersDto, 'currentPage'>;
    isCSVExport?: boolean;
  }) {
    Object.keys(filters).forEach(
      key =>
        (filters[key] === undefined || (typeof filters[key] !== 'string' && isNaN(filters[key]))) &&
        delete filters[key],
    );
    const limit = isCSVExport ? Number.MAX_SAFE_INTEGER : 5;

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

  async generateCSVFromUsers(users: User[]): Promise<string> {
    if (users.length === 0) {
      throw new Error('No users available to generate CSV.');
    }

    const cleanData = users.map(user => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      phone_number: user.phone_number,
      city: user.city,
      birthdate: user.birthdate,
      password: user.password,
      is_confirmed: user.is_confirmed,
      role_id: user.role_id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));

    const csv = Papa.unparse({
      fields: [
        'id',
        'first_name',
        'last_name',
        'email',
        'phone_number',
        'city',
        'birthdate',
        'password',
        'is_confirmed',
        'role_id',
        'createdAt',
        'updatedAt',
      ],
      data: cleanData,
    });

    return csv;
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
