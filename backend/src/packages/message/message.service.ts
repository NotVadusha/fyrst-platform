import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './entities/message.entity';
import { CreateMessageDto, UpdateMessageDto } from './dto/dto';
import { ChatService } from '../chat/chat.service';
import { UserService } from '../user/user.service';
import { ChatGateway } from 'src/packages/websocket/chat.gateway';
import { User } from '../user/entities/user.entity';
import { MessageFiltersDto } from './dto/message-filters.dto';
import { Op } from 'sequelize';
import { BucketService } from '../bucket/bucket.service';
import { NotificationService } from '../notification/notification.service';
import { NotificationType } from 'shared/packages/notification/types/notification';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message)
    private readonly messageRepository: typeof Message,
    private readonly logger: Logger,
    private readonly chatService: ChatService,
    @InjectModel(User)
    private readonly userRepository: typeof User,
    private readonly userService: UserService,
    @Inject(ChatGateway)
    private readonly gateway: ChatGateway,
    private bucketService: BucketService,
    private readonly notificationService: NotificationService,
  ) {}

  async create(chatId: number, data: CreateMessageDto & { chatId: number; userId: number }) {
    await this.validateChatExistence(chatId);
    await this.validateChatExistence(data.chatId);
    await this.validateUserExists(data.userId);

    const createdMessage = await this.messageRepository.create({
      ...data,
    });

    const messageWithUser = await createdMessage.reload({
      include: [User],
    });

    if (!!messageWithUser.attachment)
      messageWithUser.attachment = await this.bucketService.getFileLink(
        messageWithUser.attachment,
        'read',
        Date.now() + 1000 * 60 * 60 * 24 * 7,
      );

    this.gateway.wss.to(String(chatId)).emit('new-message', messageWithUser);
    this.gateway.wss.emit('conversation-update', { chatId, message: createdMessage });
    const chat = await this.chatService.find(chatId);
    const offlineUsers = Array.from(this.gateway.onlineUsers.keys()).filter(
      async userId => !chat.members.includes(await this.userService.findOne(userId)),
    );
    offlineUsers.forEach(userId => {
      this.notificationService.create({
        recipientId: userId,
        content: `New message from ${messageWithUser.user.first_name} ${messageWithUser.user.last_name}`,
        refId: chatId,
        type: NotificationType.Messenger,
      });
    });
    this.logger.log(`Created message with ID ${messageWithUser.id}`, {
      messageWithUser,
    });

    return messageWithUser;
  }

  async findAll(chatId: number, filters: MessageFiltersDto) {
    await this.validateChatExistence(chatId);

    const messages = await this.messageRepository.findAll({
      where: {
        chatId: chatId,
        messageContent: { [Op.substring]: filters.messageContent },
      },
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [{ model: User, as: 'user' }],
    });

    this.gateway.wss.emit('onFindAll', messages);

    this.logger.log(`Retrieved ${messages.length} messages`, { messages });
    return messages;
  }

  async findAllMedia(chatId: number) {
    await this.validateChatExistence(chatId);
    const messages = await this.messageRepository.findAll({
      where: {
        chatId: chatId,
        attachment: {
          [Op.not]: null,
        },
      },
      limit: 5,
      order: [['createdAt', 'DESC']],
      include: [{ model: User, as: 'user' }],
    });

    this.logger.log('just messages without link', messages);

    if (messages) {
      const messagesWithAttachmentLink = await Promise.all(
        messages.map(async message => {
          if (message.attachment) {
            const attachment = await this.bucketService.getFileLink(
              message.attachment,
              'read',
              Date.now() + 1000 * 60 * 60 * 24 * 7,
            );

            message.attachment = attachment;
          }
          return message;
        }),
      );
      this.logger.log('Media messages', messagesWithAttachmentLink);
      return messages;
    }

    return [];
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
