import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  Patch,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './entities/payment.entity';
import { PaymentsFiltersDto } from './dto/payments-filters.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import { AllPaymentsDto } from './dto/all-payments.dto';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Payment | null> {
    return this.paymentService.findOneById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(@Query() findAllDto: PaymentsFiltersDto, @Request() req): Promise<AllPaymentsDto> {
    return this.paymentService.findAll(findAllDto, req.user['id']);
  }

  @Post()
  create(@Body() data: CreatePaymentDto): Promise<Payment> {
    return this.paymentService.create(data);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<CreatePaymentDto>,
  ): Promise<Payment | null> {
    return this.paymentService.update(id, data);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.paymentService.delete(id);
  }
}
