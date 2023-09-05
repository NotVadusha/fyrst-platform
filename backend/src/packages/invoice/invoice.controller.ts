import {
  Controller,
  Get,
  Query,
  Post,
  Body,
  Param,
  Patch,
  HttpCode,
  Delete,
  Request,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoicesFiltersDto } from './dto/invoices-filters.dto';
import { AllInvoicesDto } from './dto/all-invoices';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Invoice | null> {
    return this.invoiceService.findOneById(id);
  }

  @Get()
  findAll(
    @Query() invoicesFiltersFto: InvoicesFiltersDto,
    @Request() req,
  ): Promise<AllInvoicesDto> {
    return this.invoiceService.findAll(invoicesFiltersFto, req.user['id']);
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
