import { CreateUserDto } from './dto/create-user.dto';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { RolesService } from '../roles/roles.service';
import { UserFiltersDto } from './dto/user-filters.dto';
import { Op } from 'sequelize';
import * as bcrypt from 'bcryptjs';
import { NotificationService } from '../notification/notification.service';
import { notificationTemplatePasswordChange } from 'shared/packages/notification/types/notificationTemplates';
import { Permissions } from '../permissions/entities/permissions.entity';
import jwtDecode from 'jwt-decode';
import { Roles } from '../roles/entities/roles.entity';
import { PermissionsService } from '../permissions/permissions.service';
import { userRoles } from 'shared/packages/roles/userRoles';
import { InferAttributes } from 'sequelize';
import * as Papa from 'papaparse';
import { flatten } from 'flat';
import { UserProfile } from '../user-profile/entities/user-profile.entity';
import { BucketService } from '../bucket/bucket.service';
import { Event } from '../calendar-events/entities/event.entity';
import { createEvents, EventAttributes, DateArray } from 'ics';
import { format } from 'date-fns';

@Injectable()
export class UserService {
  WEEK_IN_MILLISECONDS = 604800000;

  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService,
    private permissionsService: PermissionsService,
    private bucketService: BucketService,
  ) {}

  private logger = new Logger(UserService.name);

  async create(userInfo: CreateUserDto) {
    const sameEmailUser = await this.userRepository.findOne({ where: { email: userInfo.email } });
    if (sameEmailUser)
      throw new BadRequestException(`email ${sameEmailUser.email} is already in use`);
    const role = await this.rolesService.findOne(userInfo.role_id);
    if (!role) throw new NotFoundException("This role doesn't exist");

    this.updatePermissionsByRole(role.label as keyof typeof userRoles, userInfo.permissions);
    this.updateFacilityByRole(role.label as keyof typeof userRoles, userInfo);

    return await this.userRepository.create(
      {
        phone_number: null,
        is_confirmed: false,
        permissions: { ...userInfo.permissions },
        ...userInfo,
      },
      { include: Permissions },
    );
  }

  async findAll() {
    return await this.userRepository.findAll({ include: [Roles, Permissions] });
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

    const opiLikeFilters = {
      ...(filters.first_name && {
        first_name: {
          [Op.iLike]: `%${filters.first_name}%`,
        },
      }),
      ...(filters.last_name && {
        last_name: {
          [Op.iLike]: `%${filters.last_name}%`,
        },
      }),
      ...(filters.email && {
        email: {
          [Op.iLike]: `%${filters.email}%`,
        },
      }),
      ...(filters.city && {
        city: {
          [Op.iLike]: `%${filters.city}%`,
        },
      }),
    };

    const users = await this.userRepository.findAll({
      order: [['id', 'DESC']],
      where: {
        ...filters,
        ...opiLikeFilters,
      },
      include: [Roles, Permissions, { model: UserProfile, as: 'profile' }],
      limit,
      offset,
    });

    this.logger.log('Look at what users we received', users);

    const totalCount = await this.userRepository.count({
      where: {
        ...filters,
        ...opiLikeFilters,
      },
    });

    if (users) {
      const usersWithAvatars = await Promise.all(
        users.map(async user => {
          if (user.profile?.avatar) {
            const avatarLink = await this.bucketService.getFileLink(
              user.profile.avatar,
              'read',
              Date.now() + this.WEEK_IN_MILLISECONDS,
            );

            user.profile.avatar = avatarLink;
          }

          return user;
        }),
      );

      return { users: usersWithAvatars, totalCount };
    }

    return { users, totalCount };
  }

  async generateCSVFromUsers(users: User[]): Promise<string> {
    if (users.length === 0) {
      throw new Error('No users available to generate CSV.');
    }

    const cleanData = users.map(user => flatten(user.toJSON(), { delimiter: '_' }));
    const csv = Papa.unparse(cleanData);

    return csv;
  }

  async findOne(userId: number) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      include: [Roles, Permissions, UserProfile],
    });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findOneByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email }, include: [Roles, Permissions] });
  }

  async update(updateInfo: UpdateUserDto, userId: number) {
    const user = await this.findOne(userId);

    if (updateInfo.role_id) {
      const role = await this.rolesService.findOne(updateInfo.role_id);
      if (!role) throw new NotFoundException("This role doesn't exist");

      if (updateInfo.permissions) {
        this.updatePermissionsByRole(role.label as keyof typeof userRoles, updateInfo.permissions);
        this.permissionsService.updateByUser(user.id, updateInfo.permissions);
      }

      this.updateFacilityByRole(role.label as keyof typeof userRoles, updateInfo as CreateUserDto);
    }

    Object.assign(user, updateInfo);

    await user.save();
    return await this.findOne(user.id);
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
    return await this.userRepository.findOne({
      where: { email: email },
      include: [Roles, Permissions],
    });
  }
  async findByJwt(jwt: string) {
    const payload = jwtDecode<{ id: number }>(jwt);

    return await this.findOne(payload.id);
  }

  private updatePermissionsByRole(
    role: keyof typeof userRoles,
    permissions: InferAttributes<Permissions>,
  ) {
    if (!permissions) {
      return;
    }

    switch (role) {
      case 'PLATFORM_ADMIN':
        permissions.manageBookings = true;
        permissions.manageTimecards = true;
        permissions.manageUsers = true;
        break;
      case 'WORKER':
        permissions.manageBookings = false;
        permissions.manageTimecards = false;
        permissions.manageUsers = false;
        break;
    }
  }

  private updateFacilityByRole(role: keyof typeof userRoles, createInfo: CreateUserDto) {
    if (role !== 'FACILITY_MANAGER') {
      createInfo.facility_id = null;
      this.logger.log(JSON.stringify(createInfo));
    }
  }

  async getUserWithEvents(id: number) {
    const user = await this.userRepository.findOne({ where: { id }, include: [Event] });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async exportEvents(userId: number) {
    const user = await this.getUserWithEvents(userId);
    const events = user.events;

    const icsEvents = events.map(event => {
      const startDateArr = format(event.startDate, 'yyyy-M-d').split('-').map(Number) as DateArray;
      const endDateArr = format(event.endDate, 'yyyy-M-d').split('-').map(Number) as DateArray;

      const eventObj: EventAttributes = {
        start: startDateArr,
        end: endDateArr,
        title: event.name,
        description: event.description,
      };
      return eventObj;
    });

    const { error, value } = createEvents(icsEvents);

    if (error) throw new InternalServerErrorException('Error exporting calendar');

    return value;
  }
}
