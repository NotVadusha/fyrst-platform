import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationGateway } from '../websocket/notification.gateway';
import { Notification } from './entities/notification.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { NotificationsConfigModule } from '../notifications-config/notifications-config.module';
import { NotificationsConfigService } from '../notifications-config/notifications-config.service';
import { NotificationsConfig } from '../notifications-config/entities/notifications-config.entity';
import { WebSocketModule } from '../websocket/websocket.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Notification, NotificationsConfig]),
    NotificationsConfigModule,
    WebSocketModule,
  ],
  providers: [NotificationService, NotificationGateway, NotificationsConfigService],
  exports: [NotificationService],
})
export class NotificationModule {}
