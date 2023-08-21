import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeDevelopmentConfig } from 'src/config';
import { EmailConfirmationModule } from './packages/EmailConfirmation/emailConfirmation.module';
import { UserModule } from './packages/user/user.module';

@Module({
  imports: [
    SequelizeModule.forRoot(sequelizeDevelopmentConfig),
    UserModule,
    EmailConfirmationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
