import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCalendarDto } from './dto/create-calendar.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Calendar } from './entities/calendar.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class CalendarService {
  constructor(
    @InjectModel(Calendar)
    private readonly calendarRepository: typeof Calendar,
    private readonly userService: UserService,
  ) {}
  async create(createCalendarDto: CreateCalendarDto) {
    await this.validateUserExists(createCalendarDto.userId);
    return this.calendarRepository.create({ createCalendarDto });
  }

  async findAll() {
    return this.calendarRepository.findAll();
  }

  async findById(id: number) {
    return this.calendarRepository.findByPk(id);
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
