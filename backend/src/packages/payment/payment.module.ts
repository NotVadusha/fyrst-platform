import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Payment } from './entities/payment.entity';
import { UserModule } from '../user/user.module';
import { TaxModule } from '../tax/tax.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [SequelizeModule.forFeature([Payment]), UserModule, TaxModule, NotificationModule],

  controllers: [PaymentController],
  providers: [PaymentService],
  exports: [PaymentService],
})
export class PaymentModule {}
