import { Module, forwardRef } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { ConvertModule } from '..';

@Module({
  providers: [InvoiceService],
  controllers: [InvoiceController],
  imports: [forwardRef(() => ConvertModule)],
})
export class InvoiceModule {}
