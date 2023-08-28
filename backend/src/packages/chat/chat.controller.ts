import { Body, Controller, Delete, Get, Param, Post, ParseIntPipe, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto, UpdateChatDto } from './dto/dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(@Body() createdData: CreateChatDto) {
    return this.chatService.create(createdData);
  }

  @Get()
  async getAllChats() {
    return this.chatService.findAll();
  }

  @Get(':id')
  async getOneChat(@Param('id', ParseIntPipe) id: number) {
    return this.chatService.find(id);
  }

  @Patch(':id')
  async updateChat(@Param('id', ParseIntPipe) id: number, @Body() updatedData: UpdateChatDto) {
    return this.chatService.update(id, updatedData);
  }

  @Delete(':id')
  async deleteChat(@Param('id', ParseIntPipe) id: number) {
    return this.chatService.delete(id);
  }
}
