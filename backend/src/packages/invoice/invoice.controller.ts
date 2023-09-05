import { Controller, Get, Query, Post, Body, Param, Patch, HttpCode, Delete } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Invoice | null> {
    return this.invoiceService.findOneById(id);
  }

  @Get()
  findAll(
    @Query('payeeId') userId: number,
    @Query('minDate') minDate: Date,
    @Query('maxDate') maxDate: Date,
  ): Promise<Invoice[]> {
    return this.invoiceService.findAll(userId, minDate, maxDate);
  }

  @Post()
  create(@Body() data: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.create(data);
  }

  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<CreateInvoiceDto>,
  ): Promise<Invoice | null> {
    return this.invoiceService.update(id, data);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.invoiceService.delete(id);
  }
}
