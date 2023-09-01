import { Inject, Logger, forwardRef } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents } from 'shared/socketEvents';
import { ChatService } from './packages/chat/chat.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer()
  wss: Server<ClientToServerEvents, ServerToClientEvents>;
  // userId - socketId
  private onlineUsers = new Map<number, string>();
  private logger = new Logger('AppGateway');

  handleConnection(client: { emit: (arg0: string, arg1: string) => void }) {
    this.logger.log(`${client} New client connected`);
    client.emit('connection', 'Successfully connected to server');
  }

  @SubscribeMessage('user-join-chat')
  async handleJoinChat(client: Socket, data: { chatId: string }) {
    this.logger.log(`${client.id} joined chat ${data.chatId}`);
    client.join(data.chatId);
    const chat = await this.chatService.find(Number(data.chatId));
    const onlineUsers = chat.members
      .map(member => (this.onlineUsers.get(member.id) ? member.id : undefined))
      .filter(val => val);
    this.logger.log('onlineUsers', onlineUsers);
    this.wss.to(client.id).emit('chat-joined', { chat, onlineUsers });
  }

  @SubscribeMessage('get-conversations')
  async handleGetConversations(client: Socket, data: { userId: number }) {
    const conversations = await this.chatService.findAllByUserId(data.userId);
    this.wss.to(client.id).emit('send-conversations', conversations);
  }

  @SubscribeMessage('user-leave-chat')
  handleLeaveChat(client: Socket, data: { chatId: string }) {
    this.logger.log(`${client.id} left chat ${data.chatId}`);
    client.leave(data.chatId);
  }

  @SubscribeMessage('user-online')
  async handleUserOnline(client: Socket, data: { userId: number }) {
    this.onlineUsers.set(data.userId, client.id);
    for (const [key, value] of this.onlineUsers.entries()) {
      this.logger.log(`Key: ${key}, Value: ${value}`);
    }
    const chatIds = await this.chatService.getAllChatIdsByUserId(data.userId);
    this.wss.to(chatIds).emit('user-online', { ...data });
  }

  @SubscribeMessage('user-offline')
  async handleUserOffline(client: Socket, data: { userId: number }) {
    this.onlineUsers.delete(data.userId);
    for (const [key, value] of this.onlineUsers.entries()) {
      this.logger.log(`Key: ${key}, Value: ${value}`);
    }

    const chatIds = await this.chatService.getAllChatIdsByUserId(data.userId);
    this.wss.to(chatIds).emit('user-offline', { ...data });
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected');
    this.onlineUsers.forEach((socketId, userId) => {
      if (socketId === client.id) {
        this.onlineUsers.delete(userId);
      }
    });
  }
}
