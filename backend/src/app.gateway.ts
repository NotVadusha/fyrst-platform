import { Logger } from '@nestjs/common';
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
  constructor(private readonly chatService: ChatService) {}

  @WebSocketServer()
  wss: Server<ClientToServerEvents, ServerToClientEvents>;

  // userId - socketId
  private users = new Map<string, string>;
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

  @SubscribeMessage('user-leave-chat')
  handleLeaveChat(client: Socket, data: { chatId: string }) {
    this.logger.log(`${client.id} left chat ${data.chatId}`);
    client.leave(data.chatId);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected');
  }
}
