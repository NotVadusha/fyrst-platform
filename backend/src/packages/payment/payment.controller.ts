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
import { FindAllDto } from './dto/find-all.dto';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Payment | null> {
    return this.paymentService.findOneById(id);
  }

  @Get()
  findAll(@Query() findAllDto: FindAllDto, @Request() req): Promise<Payment[]> {
    return this.paymentService.findAll(findAllDto.userId, findAllDto.minDate, findAllDto.maxDate);
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
