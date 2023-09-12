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
import { AppGateway } from './app.gateway';
import { CalendarEventsModule } from './packages/calendar-events/calendar-events.module';
import { InvitationModule } from './packages/invitation/invitation/invitation.module';
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
    InvitationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
