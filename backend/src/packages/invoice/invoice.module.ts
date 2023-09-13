import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invoice } from './entities/invoice.entity';
import { UserModule } from '../user/user.module';
import { ClientProxyFactory } from '@nestjs/microservices';
import { invoiceService } from 'src/config/services';
import { BucketModule } from '../bucket/bucket.module';

@Module({
  imports: [SequelizeModule.forFeature([Invoice]), UserModule, BucketModule],
  providers: [
    InvoiceService,
    {
      provide: 'INVOICE_SERVICE',
      useFactory: () => ClientProxyFactory.create(invoiceService),
    },
  ],
  controllers: [InvoiceController],
  exports: [InvoiceService],
})
export class InvoiceModule {}
