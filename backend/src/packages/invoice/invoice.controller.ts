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
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { Invoice } from './entities/invoice.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoicesFiltersDto } from './dto/invoices-filters.dto';
import { AllInvoicesDto } from './dto/all-invoices';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(AccessTokenGuard)
  @Get(':id')
  findOne(@Param('id') id: number): Promise<Invoice | null> {
    return this.invoiceService.findOneById(id);
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  findAll(
    @Query() invoicesFiltersFto: InvoicesFiltersDto,
    @Request() req,
  ): Promise<AllInvoicesDto> {
    return this.invoiceService.findAll(invoicesFiltersFto, req.user['id']);
  }

  @UseGuards(AccessTokenGuard)
  @Post()
  create(@Body() data: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceService.create(data);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(200)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() data: Partial<CreateInvoiceDto>,
  ): Promise<Invoice | null> {
    return this.invoiceService.update(id, data);
  }

  @UseGuards(AccessTokenGuard)
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<boolean> {
    return this.invoiceService.delete(id);
  }

  @UseGuards(AccessTokenGuard)
  @Get(':id/pdf')
  async getInvoicePdfLink(@Param('id', ParseIntPipe) invoiceId: number) {
    return await this.invoiceService.getInvoice(invoiceId);
  }
}
