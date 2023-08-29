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

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss: Server<ClientToServerEvents, ServerToClientEvents>;

  private logger = new Logger('AppGateway');

  handleConnection(client: { emit: (arg0: string, arg1: string) => void }) {
    this.logger.log(`${client} New client connected`);
    client.emit('connection', 'Successfully connected to server');
  }

  @SubscribeMessage('user-join-chat')
  handleJoinChat(client: Socket, data: { chatId: string }) {
    client.join(data.chatId);
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected');
  }
}
