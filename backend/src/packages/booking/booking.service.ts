import { BadRequestException, Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto, UpdateBookingDto } from './dto/dto';
import { UserService } from '../user/user.service';
import { FacilityService } from '../facility/facility.service';
import { FilterBookingDto } from './dto/filter-booking.dto';
import { User } from '../user/entities/user.entity';
import { Op } from 'sequelize';
import { Facility } from '../facility/entities/facility.entity';
import { NotificationService } from '../notification/notification.service';
import { notificationTemplateBooking } from 'shared/packages/notification/types/notificationTemplates';
import * as Papa from 'papaparse';
import { prefixKeys } from '../../helpers/prefixKeys';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking)
    @Inject(UserService)
    private readonly bookingRepository: typeof Booking,
    private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly facilityService: FacilityService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(createdData: CreateBookingDto) {
    await this.validateUserExists(createdData.createdBy);
    await this.validateFacilityExists(createdData.facilityId);

    const createdBooking = await this.bookingRepository.create(createdData);
    this.logger.log(`Created note with ID ${createdBooking.id}`, {
      createdBooking,
    });
    return createdBooking;
  }

  async findAll() {
    const bookings = await this.bookingRepository.findAll({ include: [User] });
    this.logger.log(`Retrieved ${bookings.length} bookings`, { bookings });
    return bookings;
  }

  async find(id: number) {
    const booking = await this.bookingRepository.findByPk(id, {
      include: [{ model: User, as: 'users' }, { model: Facility }, { model: User, as: 'creator' }],
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    this.logger.log(`Finding booking with ID ${id}`, { booking });
    return booking;
  }

  async getAllFiltered(filters?: FilterBookingDto) {
    const {
      limit = Number.MAX_SAFE_INTEGER,
      offset = 0,
      startDate,
      endDate,
      status,
      facilityId,
    } = filters;
    const where: any = {
      ...(startDate && { startDate: { [Op.gt]: startDate } }),
      ...(endDate && { endDate: { [Op.lt]: endDate } }),
      ...(status && { status: status }),
      ...(facilityId && { facilityId: facilityId }),
    };
    const bookings = await this.bookingRepository.findAll({
      order: [['id', 'DESC']],
      where: where,
      limit: limit,
      offset: offset,
      include: [{ model: User, as: 'users' }, { model: Facility }, { model: User, as: 'creator' }],
    });
    const total = await this.bookingRepository.count({ where: where });
    return { bookings, total };
  }

  async generateCSVFromBookings(bookings: Booking[]): Promise<string> {
    if (bookings.length === 0) {
      throw new Error('No bookings available to generate CSV.');
    }

    const cleanData = bookings.map(booking => {
      const bookingJSON = booking.toJSON();
      const facilityJSON = booking.facility.toJSON();

      const prefixedFacilityJSON = prefixKeys('facility', facilityJSON);

      const usersStr = booking.users
        .map(user => `${user.first_name} ${user.last_name} (${user.id})`)
        .join('; ');

      return {
        ...bookingJSON,
        ...prefixedFacilityJSON,
        users: usersStr,
      };
    });

    const fieldKeys = Object.keys(cleanData[0]).filter(key => !['facility'].includes(key));

    const csv = Papa.unparse({
      fields: fieldKeys,
      data: cleanData,
    });

    return csv;
  }

  async update(id: number, updatedData: UpdateBookingDto) {
    const booking = await this.find(id);
    if (updatedData && updatedData.createdBy) {
      await this.validateUserExists(updatedData.createdBy);
    }
    if (updatedData && updatedData.facilityId) {
      await this.validateFacilityExists(updatedData.facilityId);
    }

    await booking.update(updatedData);
    this.logger.log(`Updated booking with ID ${id}`, { booking });
    const updatedBooking = await this.find(id);
    if (updatedData?.status) {
      updatedBooking.users.forEach(user => {
        this.notificationService.create({
          recipientId: user.id,
          content: notificationTemplateBooking(updatedBooking.facility.name, updatedBooking.status),
        });
      });
      this.notificationService.create({
        recipientId: updatedBooking.creator.id,
        content: `Booking ${updatedBooking.facility} has been ${updatedData.status}`,
      });
    }
    return booking;
  }

  async delete(id: number) {
    const booking = await this.find(id);
    await booking.destroy();
  }

  async addUserToBooking(bookingId: number, userId: number): Promise<any> {
    const booking = await this.find(bookingId);
    await this.validateUserExists(userId);

    if (booking.users && booking.users.some(user => user.id === userId)) {
      throw new BadRequestException('User already added to this booking');
    }

    await booking.$add('users', userId);
    const updatedBooking = await this.find(bookingId);
    this.logger.log(`Added user with ID ${userId} to booking with ID ${bookingId}`);

    return { message: 'User successfully added to booking!', booking: updatedBooking };
  }

  private async validateUserExists(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }

  private async validateFacilityExists(facilityId: number) {
    const facility = await this.facilityService.findById(facilityId);
    if (!facility) throw new NotFoundException('Facility not found');
  }
}
