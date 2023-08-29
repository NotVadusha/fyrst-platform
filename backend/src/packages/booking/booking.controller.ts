import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  ParseIntPipe,
  Query,
  InternalServerErrorException,
  HttpCode,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/dto';
import { ApiTags } from '@nestjs/swagger';
import { FilterBookingDto } from './dto/filter-booking.dto';

@ApiTags('booking')
@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async createBooking(@Body() createdData: CreateBookingDto) {
    return this.bookingService.create(createdData);
  }

  @Get()
  async getAllBookings() {
    return this.bookingService.findAll();
  }

  @Post(':id/addUser/:userId')
  async addUserToBooking(
  @Param('id', ParseIntPipe) bookingId: number,
  @Param('userId', ParseIntPipe) userId: number
  ) {
  return this.bookingService.addUserToBooking(bookingId, userId);
  }

  @Get('get-by')
  async getAllFiltered(@Query() filters?: FilterBookingDto) {
    try {
      return this.bookingService.getAllFiltered(filters);
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch bookings');
    }
  }

  @Get(':id')
  async getOneBooking(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.find(id);
  }

  @Patch(':id')
  async updateBooking(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedData: UpdateBookingDto,
  ) {
    return this.bookingService.update(id, updatedData);
  }

  @Delete(':id')
  async deleteBooking(@Param('id', ParseIntPipe) id: number) {
    return this.bookingService.delete(id);
  }
}
