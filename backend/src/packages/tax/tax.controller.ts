import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Delete } from '@nestjs/common';
import { Tax } from './entities/tax.entity';
import { TaxService } from './tax.service';
import { CreateTaxDto } from './dto/create-tax.dto';

@Controller('tax')
export class TaxController {
  constructor(private readonly taxService: TaxService) {}

  @Post()
  async create(@Body() createTaxDto: CreateTaxDto): Promise<Tax> {
    return this.taxService.createTax(createTaxDto);
  }

  @Get(':paymentId')
  async findAllByPaymentId(@Param('paymentId') paymentId: number): Promise<Tax[]> {
    return this.taxService.findAllTaxesByPaymentId(paymentId);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaxDto: Partial<CreateTaxDto>,
  ): Promise<Tax> {
    return this.taxService.updateTax(id, updateTaxDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.taxService.deleteTax(id);
  }
}
