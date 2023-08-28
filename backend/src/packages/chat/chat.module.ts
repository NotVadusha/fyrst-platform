import { Logger, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './entities/chat.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { UserController } from '../user/user.controller';

@Module({
  imports: [SequelizeModule.forFeature([User, Chat]), UserModule],
  controllers: [ChatController],
  providers: [ChatService, Logger],
  exports: [ChatService, Logger],
})
export class ChatModule {}
