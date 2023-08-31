import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from '../user/user.module';
import { Message } from './entities/message.entity';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';
import { ChatModule } from '../chat/chat.module';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [SequelizeModule.forFeature([Message]), UserModule, ChatModule],
  controllers: [MessageController],
  providers: [MessageService, Logger, AppGateway],
  exports: [MessageService, Logger, AppGateway],
})
export class MessageModule {}
