import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeDevelopmentConfig } from 'src/config/sequelize/sequelize.config';
import {
  EmailConfirmationModule,
  UserModule,
  TimecardModule,
  BookingModule,
  RolesModule,
} from './packages';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeDevelopmentConfig),
    RolesModule,
    UserModule,
    EmailConfirmationModule,
    TimecardModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
