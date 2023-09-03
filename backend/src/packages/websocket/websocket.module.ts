import { Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [NotificationModule],
  providers: [NotificationGateway],
  exports: [NotificationGateway],
})
export class WebSocketModule {}
