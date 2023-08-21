import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeDevelopmentConfig } from 'src/config';
import { EmailConfirmationModule } from './packages/email-confirmation/emailConfirmation.module';
import { UserModule } from './packages/user/user.module';
import { TimecardModule } from './packages/timecard/timecard.module';

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
