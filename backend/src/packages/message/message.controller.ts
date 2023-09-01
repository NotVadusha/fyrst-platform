import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  ParseIntPipe,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MessageService } from './message.service';
import { CreateMessageDto, UpdateMessageDto } from './dto/dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@ApiTags('message')
@Controller('chat/:chatId/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @UseGuards(AccessTokenGuard)
  @Post()
  async createMessage(
    @Request() req,
    @Param('chatId', ParseIntPipe) chatId: number,
    @Body() createdData: CreateMessageDto,
  ) {
    return this.messageService.create(chatId, { ...createdData, userId: req.user['id'], chatId });
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

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async updateMessage(
    @Request() req,
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedData: UpdateMessageDto,
  ) {
    return this.messageService.update(chatId, id, {
      ...updatedData,
      userId: req.user['id'],
      chatId,
    });
  }

  @Delete(':id')
  async deleteMessage(
    @Param('chatId', ParseIntPipe) chatId: number,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.messageService.delete(chatId, id);
  }
}