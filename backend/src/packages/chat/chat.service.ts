import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Chat } from './entities/chat.entity';
import { CreateChatDto, UpdateChatDto } from './dto/dto';
import { UserService } from '../user/user.service';

@Injectable()
export class ChatService {
  constructor(
    @InjectModel(Chat)
    @Inject(UserService)
    private readonly chatRepository: typeof Chat,
    private readonly logger: Logger,
    private readonly userService: UserService,
  ) {}

  async create(createdData: CreateChatDto) {
    await this.validateUserExists(createdData.userId);

    const createdChat = await this.chatRepository.create(createdData);
    this.logger.log(`Created chat with ID ${createdChat.id}`, {
      createdChat,
    });
    return createdChat;
  }

  async findAll() {
    const chats = await this.chatRepository.findAll();
    this.logger.log(`Retrieved ${chats.length} chats`, { chats });
    return chats;
  }

  async find(id: number) {
    const chat = await this.chatRepository.findByPk(id);

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }
    this.logger.log(`Finding chat with ID ${id}`, { chat });
    return chat;
  }

  async update(id: number, updatedData: UpdateChatDto) {
    const chat = await this.find(id);

    if (updatedData && updatedData.userId) {
      await this.validateUserExists(updatedData.userId);
    }

    await chat.update(updatedData);

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
