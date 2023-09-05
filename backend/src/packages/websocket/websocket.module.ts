import { Global, Module } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { ChatGateway } from './chat.gateway';

@Module({
  providers: [NotificationGateway],
  exports: [NotificationGateway],
})
export class WebSocketModule {}
