import {
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  forwardRef,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './entities/chat.entity';
import { CreateChatDto, UpdateChatDto } from './dto/dto';
import { UserService } from '../user/user.service';
import { Message } from '../message/entities/message.entity';
import { User, UserChat } from '../user/entities/user.entity';
import { Op } from 'sequelize';
import { ChatGateway } from 'src/packages/websocket/chat.gateway';
import sequelize from 'sequelize';
import { BucketService } from '../bucket/bucket.service';
import * as crypto from 'crypto';
@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat)
    private readonly chatRepository: typeof Chat,
    @InjectModel(User)
    private readonly userRepository: typeof User,
    private readonly logger: Logger,
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(forwardRef(() => ChatGateway))
    private readonly gateway: ChatGateway,
    @InjectModel(UserChat)
    private readonly userChatRepository: typeof UserChat,
    private bucketService: BucketService,
  ) {}

  async create(createdData: CreateChatDto & { ownerId: number }) {
    let membersWithoutOwner = createdData.members;

    if (createdData.members.length >= 2) {
      membersWithoutOwner = createdData.members.filter(
        memberId => memberId !== createdData.ownerId,
      );
    } else if (
      createdData.members.length === 1 &&
      createdData.members.includes(createdData.ownerId)
    ) {
      throw new HttpException(
        'You cannot create a conversation with yourself',
        HttpStatus.BAD_REQUEST,
      );
    }

    const members = await this.userRepository.findAll({ where: { id: membersWithoutOwner } });

    if (!members.length) {
      const plural = createdData.members.length > 1;

      throw new NotFoundException(
        `Member${plural ? 's' : ''} with email${plural ? 's' : ''} ${createdData.members.join(
          ' ',
        )} ${plural ? 'werent' : 'wasnt'} found.`,
      );
    }

    const owner = await this.userRepository.findOne({ where: { id: createdData.ownerId } });

    const allMembers = [...members, owner];

    if (allMembers.length === 2) {
      const conv = await this.findUserConversations(allMembers.map(({ id }) => id));

      if (conv.length > 0) {
        throw new HttpException(
          'You already have a conversation with this user',
          HttpStatus.BAD_REQUEST,
        );
      }
    }

    const chat = await this.chatRepository.create({
      name: allMembers
        .map(({ first_name, last_name }) => `${first_name} ${last_name ?? ''}`)
        .join(' '),
      ownerId: createdData.ownerId,
    });

    chat.$set('members', allMembers);

    this.logger.log(`Created chat with ID ${chat.id}`, {
      chat,
    });

    const onlineMembers = this.gateway.getOnlineMembers(allMembers.map(({ id }) => id));

    this.logger.log(`Emmitted creation to online members: ${onlineMembers}`);

    this.gateway.wss.to(onlineMembers).emit('new-conversation', {
      ...chat.dataValues,
      members: allMembers,
      messages: [],
    });

    return chat;
  }

  async getAll() {
    const chats = await this.chatRepository.findAll({
      include: [
        { model: User, as: 'members' },
        { model: User, as: 'user' },
      ],
    });

    return chats;
  }

  async findUserConversations(ids: number[]) {
    const userChats = await UserChat.findAll({
      attributes: ['chatId'],
      group: ['chatId'],
      having: sequelize.where(sequelize.literal('array_agg("userId")'), {
        [sequelize.Op.in]: [ids],
      }),
    });

    return userChats;
  }

  async findAllByUserId(id: number) {
    if (!id) {
      throw new HttpException(
        'Cannot get your chats, try loggin in first.',
        HttpStatus.UNAUTHORIZED,
      );
    }

    this.logger.log('getting chats');

    const chats = (
      await this.userChatRepository.findAll({
        // attributes: ["chat"],
        include: [
          {
            model: Chat,
            as: 'chat',
            include: [
              {
                model: Message,
                as: 'messages',
                separate: true,
                include: [{ model: User, as: 'user' }],
              },
              { model: User, as: 'members' },
            ],
          },
        ],
        where: {
          userId: id,
        },
      })
    )
      .map(chatData => chatData.chat)
      .sort(
        ({ messages: messagesA }, { messages: messagesB }) =>
          messagesB?.[0]?.createdAt - messagesA?.[0]?.createdAt,
      );

    this.logger.log('chats: ', chats);

    return chats;
  }

  async uploadAttachment(userId: number, attachment: string) {
    const { fileTypeFromBuffer } = await (eval('import("file-type")') as Promise<
      typeof import('file-type')
    >);

    const imgBuffer = Buffer.from(attachment, 'base64');
    const fileType = await fileTypeFromBuffer(imgBuffer);
    const fileName = `${userId}_${crypto.randomUUID()}.${fileType.ext}`;

    const attachmentPath = `attachment/${fileName}`;
    await this.bucketService.save(attachmentPath, imgBuffer);

    return attachmentPath;
  }

  async find(id: number) {
    const chat = await this.chatRepository.findByPk(id, {
      include: [
        { model: Message, include: [{ model: User, as: 'user' }] },
        { model: User, as: 'members' },
      ],
    });

    if (chat && chat.messages) {
      chat.messages = await Promise.all(
        chat.messages.map(async m => {
          if (m.attachment) {
            const attachmentLink = await this.bucketService.getFileLink(
              m.attachment,
              'read',
              Date.now() + 1000 * 60 * 60 * 24 * 7,
            );

            m.attachment = attachmentLink;
          }
          return m;
        }),
      );
    }

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    return chat;
  }

  async searchChats(query: string) {
    const chats = await this.chatRepository.findAll({
      include: [
        { model: User, as: 'members' },
        { model: User, as: 'user' },
      ],
      where: {
        name: {
          [Op.iLike]: `%${query}%`,
        },
      },
    });

    this.logger.log(`Searched ${chats.length} chats with query: ${query}`, { chats });
    return chats;
  }

  async getAllChatIdsByUserId(userId: number) {
    return (
      await this.userChatRepository.findAll({
        where: {
          userId,
        },
        attributes: ['chatId'],
      })
    ).map(({ chatId }) => String(chatId));
  }

  async update(id: number, updatedData: UpdateChatDto & { ownerId: number }) {
    const chat = await this.find(id);

    if (updatedData && updatedData.ownerId) {
      await this.validateUserExists(updatedData.ownerId);
    }

    const members = await this.userRepository.findAll({ where: { email: updatedData.members } });

    await chat.update({ name: updatedData.name, ownerId: updatedData.ownerId, members });

    this.logger.log(`Updated chat with ID ${id}`, { chat });
    return chat;
  }

  async delete(id: number) {
    const chat = await this.find(id);
    await chat.destroy();
  }

  private async validateUserExists(userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
  }
}
