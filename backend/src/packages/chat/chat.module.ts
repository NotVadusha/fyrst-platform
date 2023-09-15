import { Logger, Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './entities/chat.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserModule } from '../user/user.module';
import { User, UserChat } from '../user/entities/user.entity';
import { UserController } from '../user/user.controller';
import { ChatGateway } from 'src/packages/websocket/chat.gateway';
import { BucketModule } from '../bucket/bucket.module';
import { WebSocketModule } from '../websocket/websocket.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Chat, UserChat]),
    UserModule,
    BucketModule,
    forwardRef(() => WebSocketModule),
  ],
  controllers: [ChatController],
  providers: [ChatService, Logger],
  exports: [ChatService, Logger],
})
export class ChatModule {}
