import { Body, Controller, Delete, Get, Param, Post, Patch, ParseIntPipe } from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto } from './dto/dto';
import { ApiTags } from '@nestjs/swagger';

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
