import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationsConfig } from './entities/notifications-config.entity';
import { NotificationsConfigService } from './notifications-config.service';
import { NotificationsConfigController } from './notifications-config.controller';

@Module({
  imports: [SequelizeModule.forFeature([NotificationsConfig])],
  controllers: [NotificationsConfigController],
  providers: [NotificationsConfigService],
  exports: [NotificationsConfigService],
})
export class NotificationsConfigModule {}
