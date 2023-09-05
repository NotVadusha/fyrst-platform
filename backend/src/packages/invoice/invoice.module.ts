import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invoice } from './entities/invoice.entity';

@Module({
  imports: [SequelizeModule.forFeature([Invoice])],
  providers: [InvoiceService],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
