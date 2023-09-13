import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Timecard } from './entities/timecard.entity';
import { TimecardController } from './timecard.controller';
import { TimecardService } from './timecard.service';
import { UserModule } from '../user/user.module';
import { InvoiceModule } from '../invoice/invoice.module';
import { PaymentModule } from '../payment/payment.module';

@Module({
  imports: [SequelizeModule.forFeature([Timecard]), UserModule, InvoiceModule, PaymentModule],
  providers: [TimecardService],
  controllers: [TimecardController],
  exports: [TimecardService],
})
export class TimecardModule {}
