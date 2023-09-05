import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ServerToClientEvents } from 'shared/packages/notification/types/notificationSocketEvents';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Notification } from 'shared/packages/notification/types/notification';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';

@WebSocketGateway({
  namespace: 'notification',
})
@UseGuards(AccessTokenGuard)
@Injectable()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server<any, ServerToClientEvents>;

  private logger = new Logger('NotificationGateway');

  handleConnection(client: Socket) {
    this.logger.log(`${client} New client connected`);
    client.emit('connection', 'Successfully connected to server');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected');
  }

  async create(notification: Notification) {
    this.server.emit('notificationCreated', notification);
  }

  async markAsRead(notification: Notification) {
    return this.server.emit('notificationIsRead', notification);
  }
}
