import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './entities/booking.entity';
import { CreateBookingDto, UpdateBookingDto } from './dto/dto';
import { UserService } from '../user/user.service';
import { FacilityService } from '../facility/facility.service';
import { FilterBookingDto } from './dto/filter-booking.dto';
import { User } from '../user/entities/user.entity';
import { Op } from 'sequelize';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking)
    @Inject(UserService)
    private readonly bookingRepository: typeof Booking,
    private readonly logger: Logger,
    private readonly userService: UserService,
    private readonly facilityService: FacilityService,
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
    const booking = await this.bookingRepository.findByPk(id);

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    this.logger.log(`Finding booking with ID ${id}`, { booking });
    return booking;
  }

  async getAllFiltered(filters?: FilterBookingDto) {
    const { limit = Number.MAX_SAFE_INTEGER, offset = 0, startDate, endDate, status } = filters;
    console.log(startDate, endDate);

    const where: any = {
      ...(startDate && { startDate: { [Op.gt]: startDate } }),
      ...(endDate && { endDate: { [Op.lt]: endDate } }),
      ...(status && { status: status }),
    };

    const bookings = await this.bookingRepository.findAll({
      where: where,
      limit: limit,
      offset: offset,
    });
    const total = await this.bookingRepository.count();
    return { bookings, total };
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
    return booking;
  }

  async delete(id: number) {
    const booking = await this.find(id);
    await booking.destroy();
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
