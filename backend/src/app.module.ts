import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeDevelopmentConfig } from 'src/config/sequelize/sequelize.config';
import { EmailConfirmationModule } from './packages/email-confirmation/emailConfirmation.module';
import { UserModule } from './packages/user/user.module';
import { TimecardModule } from './packages/timecard/timecard.module';
import { RolesModule } from './packages/roles/roles.module';
@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeDevelopmentConfig),
    RolesModule,
    UserModule,
    EmailConfirmationModule,
    TimecardModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
