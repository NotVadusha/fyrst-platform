import { Inject, Injectable, Logger, UseGuards, forwardRef } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents, TypingUser } from 'shared/socketEvents';
import { ChatService } from '../chat/chat.service';
import { SocketAuthMiddleware } from '../auth/ws.md';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { randomUUID } from 'crypto';

@WebSocketGateway()
@UseGuards(WsJwtGuard)
@Injectable()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    @Inject(forwardRef(() => ChatService))
    private readonly chatService: ChatService,
  ) {}

  @WebSocketServer()
  wss: Server<ClientToServerEvents, ServerToClientEvents>;
  // userId - socketId
  public onlineUsers = new Map<number, string>();
  private logger = new Logger('ChatGateway');

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware() as any);
    Logger.log('afterInit');
  }

  handleConnection(client: { emit: (arg0: string, arg1: string) => void }) {
    this.logger.log(`${client} New client connected`);
    client.emit('connection', 'Successfully connected to server');
  }

  getOnlineMembers(memberIds: number[]) {
    const sockets = memberIds.map(id => this.onlineUsers.get(id)).filter(val => val);
    this.logger.log(sockets);
    return sockets;
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

  @SubscribeMessage('user-type')
  handleUserType(client: Socket, data: { user: TypingUser; chatId: string }) {
    this.logger.log(`${data.user.id} is typing in chat ${data.chatId}`);
    client.to(data.chatId).emit('user-typing', { user: data.user });
  }

  @SubscribeMessage('user-stop-type')
  handleUserStopType(client: Socket, data: { user: TypingUser; chatId: string }) {
    this.logger.log(`${data.user.id} stopped typing in chat ${data.chatId}`);
    client.to(data.chatId).emit('user-stop-typing', { user: data.user });
  }

  @SubscribeMessage('user-join-meeting')
  async handleJoinMeeting(client: Socket, data: { meetingId: string }) {
    this.logger.log(`${client.id} joined meeting ${data.meetingId}`);
    client.join(data.meetingId);
  }

  @SubscribeMessage('new-meeting-message')
  async handleNewMeetingMessage(
    client: Socket,
    data: { meetingId: string; messageContent: string; username: string; time: string; id: string },
  ) {
    this.logger.log(`${client.id} sent a message to ${data.meetingId}`);

    this.wss.to(data.meetingId).emit('new-meeting-message', {
      messageContent: data.messageContent,
      username: data.username,
      time: data.time,
      id: data.id,
    });
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
