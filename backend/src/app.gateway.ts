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
// import { AuthService } from './packages/auth/auth.service';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService, // private readonly authService: AuthService,
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
    this.wss.to(client.id).emit('chat-joined', chat);
  }

  @SubscribeMessage('get-conversations')
  async handleGetConversations(client: Socket, data: { userId: number }) {
    // this.logger.log(client.handshake.headers.token);
    // const payload = this.authService.getTokens
    const conversations = await this.chatService.findAllByUserId(data.userId);
    this.wss.to(client.id).emit('send-conversations', conversations);
  }

  @SubscribeMessage('user-leave-chat')
  handleLeaveChat(client: Socket, data: { chatId: string }) {
    this.logger.log(`${client.id} left chat ${data.chatId}`);
    client.leave(data.chatId);
  }

  @SubscribeMessage('user-online')
  handleUserOnline(client: Socket, data: { userId: number }) {
    this.onlineUsers.set(data.userId, client.id);
    this.logger.log(client.handshake.headers.authorization);
    for (const [key, value] of this.onlineUsers.entries()) {
      this.logger.log(`Key: ${key}, Value: ${value}`);
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected');
  }
}
