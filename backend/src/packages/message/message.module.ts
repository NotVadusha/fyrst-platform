import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../user/user.module';
import { Message } from './entities/message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { ChatModule } from '../chat/chat.module';
import { ChatGateway } from 'src/packages/websocket/chat.gateway';
import { BucketModule } from '../bucket/bucket.module';
import { WebSocketModule } from '../websocket/websocket.module';
import { User } from '../user/entities/user.entity';

@Module({
  imports: [SequelizeModule.forFeature([Message, User]), UserModule, ChatModule, BucketModule],
  controllers: [MessageController],
  providers: [MessageService, Logger, ChatGateway],
  exports: [MessageService, Logger, ChatGateway],
})
export class MessageModule {}
