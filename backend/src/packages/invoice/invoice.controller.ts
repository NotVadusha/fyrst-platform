import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { InvoiceService } from './invoice.service';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @Get()
  async hello() {
    return await this.invoiceService.getHello();
  }

  @Get(':id')
  async getInvoice(@Param('id', ParseIntPipe) timecardId: number) {
    return await this.invoiceService.getInvoice(timecardId);
  }
}
