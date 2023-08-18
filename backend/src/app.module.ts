import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { sequelizeDevelopmentConfig } from './config';
import { Module } from '@nestjs/common';

@Module({
  imports: [SequelizeModule.forRoot(sequelizeDevelopmentConfig), UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
