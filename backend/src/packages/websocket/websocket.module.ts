import { Global, Module, forwardRef } from '@nestjs/common';
import { NotificationGateway } from './notification.gateway';
import { ChatGateway } from './chat.gateway';
import { ChatService } from '../chat/chat.service';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [forwardRef(() => ChatModule)],
  providers: [NotificationGateway, ChatGateway],
  exports: [NotificationGateway, ChatGateway],
})
export class WebSocketModule {}
