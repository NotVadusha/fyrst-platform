import { Body, Controller, Get, Param, Post, Delete, HttpCode, Patch, Query } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { FindAllDto } from './dto/find-all.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Payment | null> {
    return this.paymentService.findOneById(id);
  }

  @Get()
  findAll(
    @Query('userId') userId: number,
    @Query('minDate') minDate: Date,
    @Query('maxDate') maxDate: Date,
  ): Promise<Payment[]> {
    return this.paymentService.findAll(userId, minDate, maxDate);
  }

  @Post()
  create(@Body() data: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(data);
  }

  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<CreatePaymentDto>,
  ): Promise<Payment | null> {
    return this.paymentService.update(id, data);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.paymentService.delete(id);
  }
}
