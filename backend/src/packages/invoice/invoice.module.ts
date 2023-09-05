import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invoice } from './entities/invoice.entity';
import { UserModule } from '../user/user.module';
import { BookingModule } from '../booking/booking.module';
import { TimecardModule } from '../timecard/timecard.module';
import { FacilityModule } from '../facility/facility.module';
import { ClientProxyFactory } from '@nestjs/microservices';
import { invoiceService } from 'src/config/services';

@Module({
  imports: [
    SequelizeModule.forFeature([Invoice]),
    UserModule,
    BookingModule,
    TimecardModule,
    FacilityModule,
  ],
  providers: [
    InvoiceService,
    {
      provide: 'INVOICE_SERVICE',
      useFactory: () => ClientProxyFactory.create(invoiceService),
    },
  ],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
