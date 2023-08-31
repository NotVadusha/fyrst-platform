import { Logger, Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Chat } from './entities/chat.entity';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import { UserController } from '../user/user.controller';
import { AppGateway } from 'src/app.gateway';

@Module({
  imports: [SequelizeModule.forFeature([User, Chat]), UserModule],
  controllers: [ChatController],
  providers: [ChatService, Logger, AppGateway],
  exports: [ChatService, Logger, AppGateway],
})
export class ChatModule {}
