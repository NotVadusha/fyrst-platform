import { Logger } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import {
  ClientToServerEvents,
  SendMessagePayload,
  ServerToClientEvents,
} from 'shared/socketEvents';

@WebSocketGateway()
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  wss: Server<ClientToServerEvents, ServerToClientEvents>;

  private logger = new Logger('AppGateway');

  handleConnection(client: { emit: (arg0: string, arg1: string) => void }) {
    this.logger.log('New client connected');
    client.emit('connection', 'Successfully connected to server');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected');
  }
}
