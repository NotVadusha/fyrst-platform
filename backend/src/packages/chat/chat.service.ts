import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './entities/chat.entity';
import { CreateChatDto, UpdateChatDto } from './dto/dto';
import { UserService } from '../user/user.service';
import { Message } from '../message/entities/message.entity';
import { User } from '../user/entities/user.entity';
import { Op } from 'sequelize';

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
  ) {}

  async create(createdData: CreateChatDto & { ownerId: number }) {
    const members = await this.userRepository.findAll({ where: { email: createdData.members } });

    if (!members.length) {
      const plural = createdData.members.length > 1;

      throw new NotFoundException(
        `Member${plural ? 's' : ''} with email${plural ? 's' : ''} ${createdData.members.join(
          ' ',
        )} ${plural ? 'werent' : 'wasnt'} found.`,
      );
    }

    const owner = await this.userRepository.findOne({ where: { id: createdData.ownerId } });

    const chat = await this.chatRepository.create({
      name: createdData.name,
      ownerId: createdData.ownerId,
    });

    // members should include the owner
    chat.$set('members', [...members, owner]);

    this.logger.log(`Created chat with ID ${chat.id}`, {
      chat,
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
    this.logger.log(`Retrieved ${chats.length} chats`, { chats });
    return chats;
  }

  async findAllByUserId(id: number) {
    // for each chat we get the members and the last message
    const chats = await this.chatRepository.findAll({
      include: [
        { model: User, as: 'members', required: true, where: { id } },
        {
          model: Message,
          as: 'messages',
          separate: true,
          limit: 1,
          order: [['createdAt', 'DESC']],
          include: [
            {
              model: User,
              as: 'user',
            },
          ],
        },
      ],
    });
    this.logger.log(`Retrieved ${chats.length} chats`, { chats });
    return chats;
  }

  async find(id: number) {
    const chat = await this.chatRepository.findByPk(id, {
      include: [{ model: Message }, { model: User, as: 'members' }],
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    this.logger.log(`Finding chat with ID ${id}`, { chat });
    return chat;
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
