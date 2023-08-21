import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeDevelopmentConfig } from 'src/config';
import { EmailConfirmationModule } from './EmailConfirmation/emailConfirmation.module';
import { TimecardModule } from './timecard/timecard.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeDevelopmentConfig),
    UserModule,
    EmailConfirmationModule,
    TimecardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
