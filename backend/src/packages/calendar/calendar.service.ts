import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Calendar } from './entities/calendar.entity';
import { UserService } from '../user/user.service';
import { Event } from '../calendar-events/entities/event.entity';
import { Booking } from '../booking/entities/booking.entity';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar) private readonly calendarRepository: typeof Calendar,
    private readonly userService: UserService,
  ) {}
  async create(createCalendarDto: CreateCalendarDto) {
    console.log({ ...createCalendarDto });
    await this.validateUserExists(createCalendarDto.userId);
    return this.calendarRepository.create({ ...createCalendarDto });
  }

  async findAll() {
    return this.calendarRepository.findAll();
  }

  async findById(id: number) {
    return this.calendarRepository.findByPk(id);
  }

  async findByUserId(id: number) {
    await this.validateUserExists(id);
    return this.calendarRepository.findOne({
      where: { userId: id },
      include: [{ model: Event, include: [Booking] }],
    });
  }

  async remove(id: number) {
    const calendar = await this.findById(id);
    await calendar.destroy();
    return calendar;
  }

  private async validateUserExists(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
