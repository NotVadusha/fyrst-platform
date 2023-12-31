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
import { UserProfile } from '../user-profile/entities/user-profile.entity';
import { messageNewNotification } from 'shared/packages/notification/types/notificationTemplates';
@Injectable()
export class MessageService {
  WEEK_IN_MILLISECONDS = 604800000;

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
      include: [{ model: User, as: 'user', include: [{ model: UserProfile, as: 'profile' }] }],
    });

    if (!!messageWithUser.attachment)
      messageWithUser.attachment = await this.bucketService.getFileLink(
        messageWithUser.attachment,
        'read',
        Date.now() + this.WEEK_IN_MILLISECONDS,
      );

    if (!!messageWithUser.user.profile?.avatar)
      messageWithUser.user.profile.avatar = await this.bucketService.getFileLink(
        messageWithUser.user.profile.avatar,
        'read',
        Date.now() + this.WEEK_IN_MILLISECONDS,
      );

    this.gateway.wss.to(String(chatId)).emit('new-message', messageWithUser);
    this.gateway.wss.emit('conversation-update', { chatId, message: createdMessage });

    const chat = await this.chatService.find(chatId);
    const onlineUsers = [...this.gateway.onlineUsers.keys()];
    const chatMembers = chat.members.map(user => user.id);
    const offlineUsers = chatMembers.filter(userId => !onlineUsers.includes(userId));
    this.logger.log('Offline users: ', offlineUsers);

    offlineUsers.forEach(userId => {
      this.notificationService.create({
        recipientId: userId,
        content: messageNewNotification(chat.name),
        refId: chat.id,
        type: 'messenger',
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
      include: [{ model: User, as: 'user', include: [{ model: UserProfile, as: 'profile' }] }],
    });

    if (messages) {
      const messagesWithProfileAvatars = await Promise.all(
        messages.map(async message => {
          if (message.user.profile?.avatar) {
            const avatarLink = await this.bucketService.getFileLink(
              message.user.profile.avatar,
              'read',
              Date.now() + this.WEEK_IN_MILLISECONDS,
            );

            message.user.profile.avatar = avatarLink;
          }
          return message;
        }),
      );
      return messagesWithProfileAvatars;
    }

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
      include: [{ model: User, as: 'user', include: [{ model: UserProfile, as: 'profile' }] }],
    });

    this.logger.log('just messages without link', messages);

    if (messages) {
      const messagesWithAttachmentLink = await Promise.all(
        messages.map(async message => {
          if (message.attachment) {
            const attachment = await this.bucketService.getFileLink(
              message.attachment,
              'read',
              Date.now() + this.WEEK_IN_MILLISECONDS,
            );

            message.attachment = attachment;
          }

          if (message.user.profile?.avatar) {
            const avatarLink = await this.bucketService.getFileLink(
              message.user.profile.avatar,
              'read',
              Date.now() + this.WEEK_IN_MILLISECONDS,
            );

            message.user.profile.avatar = avatarLink;
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
