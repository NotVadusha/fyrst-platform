import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { ConvertModule } from '../convert/convert.module';

@Module({
  providers: [InvoiceService],
  controllers: [InvoiceController],
  imports: [ConvertModule],
})
export class InvoiceModule {}
