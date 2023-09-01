import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from './notification.gateway';
import { Notification } from './entities/notification.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../user/user.module';
import { NotificationsConfigModule } from '../notifications-config/notifications-config.module';
import { NotificationsConfigService } from '../notifications-config/notifications-config.service';

@Module({
  imports: [SequelizeModule.forFeature([Notification]), UserModule, NotificationsConfigModule],
  providers: [NotificationGateway, NotificationService, NotificationsConfigService],
})
export class NotificationModule {}
