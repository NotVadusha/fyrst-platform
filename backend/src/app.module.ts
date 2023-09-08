import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { development } from 'src/config';
import { CalendarEventsModule } from './packages/calendar-events/calendar-events.module';

import {
  EmailConfirmationModule,
  UserModule,
  TimecardModule,
  BookingModule,
  RolesModule,
  AuthModule,
  RedisModule,
  ResetPasswordModule,
  UserProfileModule,
  FacilityModule,
  ChatModule,
  MessageModule,
  NotificationsConfigModule,
  BucketModule,
  PermissionsModule,
  StatisticsModule,
  PaymentModule,
  StripeModule,
  InvoiceModule,
  NotificationModule,
  WebSocketModule,
} from './packages';

@Module({
  imports: [
    SequelizeModule.forRoot(development),
    RolesModule,
    UserModule,
    EmailConfirmationModule,
    AuthModule,
    RedisModule,
    ResetPasswordModule,
    TimecardModule,
    BookingModule,
    UserProfileModule,
    FacilityModule,
    ChatModule,
    MessageModule,
    NotificationsConfigModule,
    BucketModule,
    PermissionsModule,
    StatisticsModule,
    CalendarEventsModule,
    PaymentModule,
    StripeModule,
    InvoiceModule,
    NotificationModule,
    WebSocketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
