import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { sequelizeDevelopmentConfig } from 'src/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user';

@Module({
  imports: [SequelizeModule.forRoot(sequelizeDevelopmentConfig), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
