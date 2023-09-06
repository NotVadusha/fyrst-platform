import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Calendar } from './entities/calendar.entity';
import { UserService } from '../user/user.service';
import { Event } from '../calendar-events/entities/event.entity';
import { Booking } from '../booking/entities/booking.entity';
import { Not } from 'sequelize-typescript';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar) private readonly calendarRepository: typeof Calendar,
    private readonly userService: UserService,
  ) {}
  async create(createCalendarDto: CreateCalendarDto) {
    await this.userService.findOne(createCalendarDto.userId);
    return await this.calendarRepository.create({ ...createCalendarDto });
  }

  async findAll() {
    return await this.calendarRepository.findAll();
  }

  async findById(id: number) {
    const calendar = await this.calendarRepository.findByPk(id);
    if (!calendar) throw new NotFoundException('Calendar not found');
    return calendar;
  }

  async findByUserId(id: number) {
    await this.userService.findOne(id);
    return await this.calendarRepository.findOne({
      where: { userId: id },
      include: [{ model: Event, include: [Booking] }],
    });
  }

  async remove(id: number) {
    const calendar = await this.findById(id);
    await calendar.destroy();
    return calendar;
  }
}
