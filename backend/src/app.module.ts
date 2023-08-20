import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { sequelizeDevelopmentConfig } from 'src/config';
import { EmailConfirmationModule } from './EmailConfirmation/emailConfirmation.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user';
import { TimecardModule } from './timecard/timecard.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeDevelopmentConfig),
    UserModule,
    EmailConfirmationModule,
    TimecardModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
