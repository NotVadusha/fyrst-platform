import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Request,
  ParseIntPipe,
  Patch,
  UseGuards,
  Query,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { CreateChatDto, UpdateChatDto } from './dto/dto';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @UseGuards(AccessTokenGuard)
  @Post('attachment/upload')
  async uploadAttachment(@Request() req, @Body() data: { attachment: string }) {
    return await this.chatService.uploadAttachment(req.user['id'], data.attachment);
  }

  @UseGuards(AccessTokenGuard)
  @Delete('attachment')
  async deleteAttachment(@Request() req, @Query('path') path: string) {
    return await this.chatService.deleteAttachment(req.user['id'], path);
  }
  і;
  @UseGuards(AccessTokenGuard)
  @Post()
  async createChat(@Request() req, @Body() createdData: CreateChatDto) {
    return this.chatService.create({ ...createdData, ownerId: req.user['id'] });
  }

  @UseGuards(AccessTokenGuard)
  @Get()
  async getAllUserChats(@Request() req) {
    return this.chatService.findAllByUserId(req.user['id']);
  }

  @UseGuards(AccessTokenGuard)
  @Get('search')
  async searchChats(@Query('name') query: string) {
    return this.chatService.searchChats(query);
  }

  @Get('all')
  async getAllChats() {
    return this.chatService.getAll();
  }

  @Get(':id')
  async getOneChat(@Param('id', ParseIntPipe) id: number) {
    return this.chatService.find(id);
  }

  @UseGuards(AccessTokenGuard)
  @Patch(':id')
  async updateChat(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Body() updatedData: UpdateChatDto,
  ) {
    return this.chatService.update(id, { ...updatedData, ownerId: req.user['id'] });
  }

  @Delete(':id')
  async deleteChat(@Param('id', ParseIntPipe) id: number) {
    return this.chatService.delete(id);
  }
}
