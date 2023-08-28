import { Body, Controller, Delete, Get, Param, Post, Patch, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { CreateMessageDto, UpdateMessageDto } from './dto/dto';

@ApiTags('message')
@Controller('chat/:chatId/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  async createMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Body() createdData: CreateMessageDto,
  ) {
    return this.messageService.create(chatId, createdData);
  }

  @Get()
  async getAllMessages(@Param('chatId', ParseIntPipe) chatId: number) {
    return this.messageService.findAll(chatId);
  }

  @Get(':id')
  async getOneMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.messageService.find(chatId, id);
  }

  @Patch(':id')
  async updateMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedData: UpdateMessageDto,
  ) {
    return this.messageService.update(chatId, id, updatedData);
  }

  @Delete(':id')
  async deleteMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.messageService.delete(chatId, id);
  }
}
