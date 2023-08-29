import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './entities/message.entity';
import { CreateMessageDto, UpdateMessageDto } from './dto/dto';
import { ChatService } from '../chat/chat.service';
import { UserService } from '../user/user.service';
import { AppGateway } from 'src/app.gateway';
@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message)
    private readonly messageRepository: typeof Message,
    private readonly logger: Logger,
    private readonly chatService: ChatService,
    private readonly userService: UserService,
    private readonly gateway: AppGateway,
  ) {}

  async create(chatId: number, data: CreateMessageDto & { chatId: number; userId: number }) {
    await this.validateChatExistence(chatId);
    await this.validateChatExistence(data.chatId);
    await this.validateUserExists(data.userId);

    const createdMessage = await this.messageRepository.create({
      ...data,
    });

    this.gateway.wss.to(String(chatId)).emit('onCreate', createdMessage);

    this.logger.log(`Created message with ID ${createdMessage.id}`, {
      createdMessage,
    });

    return createdMessage;
  }

  async findAll(chatId: number) {
    await this.validateChatExistence(chatId);

    const messages = await this.messageRepository.findAll({
      where: {
        chatId: chatId,
      },
    });

    this.gateway.wss.emit('onFindAll', messages);

    this.logger.log(`Retrieved ${messages.length} messages`, { messages });
    return messages;
  }

  async find(chatId: number, id: number) {
    await this.validateChatExistence(chatId);

    const message = await this.messageRepository.findOne({
      where: {
        chatId,
        id,
      },
    });

    this.gateway.wss.emit('onFind', message);

    if (!message) {
      throw new NotFoundException('Message not found');
    }
    this.logger.log(`Finding message with ID ${id}`, { message });
    return message;
  }

  async update(
    chatId: number,
    id: number,
    updatedData: UpdateMessageDto & { chatId: number; userId: number },
  ) {
    const message = await this.find(chatId, id);

    if (updatedData && updatedData.userId) {
      await this.validateUserExists(updatedData.userId);
    }

    if (updatedData && updatedData.chatId) {
      await this.validateChatExistence(updatedData.chatId);
    }

    this.gateway.wss.emit('onUpdate', message);

    await message.update(updatedData);
    this.logger.log(`Updated message with ID ${id}`, { message });

    return message;
  }

  async delete(chatId: number, id: number) {
    await this.validateChatExistence(chatId);
    const message = await this.find(chatId, id);

    this.gateway.wss.emit('onDelete', message);

    await message.destroy();
  }

  private async validateChatExistence(chatId: number) {
    const chat = await this.chatService.find(chatId);
    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
  }

  private async validateUserExists(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
