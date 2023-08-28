import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './entities/chat.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [SequelizeModule.forFeature([Chat]), UserModule],
  controllers: [ChatController],
  providers: [ChatService, Logger],
  exports: [ChatService, Logger],
})
export class ChatModule {}
