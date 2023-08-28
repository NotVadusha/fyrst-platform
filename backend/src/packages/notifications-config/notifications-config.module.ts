import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationConfig } from './entities/notifications-config.entity';
import { NotificationsConfigService } from './notifications-config.service';
import { NotificationsConfigController } from './notifications-config.controller';

@Module({
  imports: [SequelizeModule.forFeature([NotificationConfig])],
  controllers: [NotificationsConfigController],
  providers: [NotificationsConfigService],
})
export class NotificationConfigModule {}
