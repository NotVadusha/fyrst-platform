import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ServerToClientEvents } from 'shared/packages/notification/types/notificationSocketEvents';
import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { Notification } from 'shared/packages/notification/types/notification';
import { WsJwtGuard } from '../auth/guards/ws-jwt.guard';
import { SocketAuthMiddleware } from '../auth/ws.md';

@WebSocketGateway()
@UseGuards(WsJwtGuard)
@Injectable()
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server<any, ServerToClientEvents>;

  private logger = new Logger('NotificationGateway');

  private connectedClients = new Map<number, string>();

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware() as any);
    Logger.log('afterInit');
  }

  handleConnection(client: Socket) {
    this.logger.log(`${client} New client connected`);
    this.logger.log('Connected clients', {
      keys: [...this.connectedClients.keys()],
      values: [...this.connectedClients.values()],
    });

    client.emit('connection', 'Successfully connected to ws server');
  }

  async create(notification: Notification) {
    this.logger.log(`created notification was send for ${notification.recipientId}`);
    this.logger.log(this.connectedClients.get(notification.recipientId));
    this.server
      .to(this.connectedClients.get(notification.recipientId))
      .emit('createNotification', notification);
  }

  async markAsRead(notification: Notification) {
    this.logger.log(`notification is read by ${notification.recipientId}`);
    this.server
      .to(this.connectedClients.get(notification.recipientId))
      .emit('notificationIsRead', notification);
  }

  @SubscribeMessage('mapping')
  async mapping(client: Socket, data: { userId: number }) {
    if (this.connectedClients.get(data.userId) === client.id) {
      return;
    }
    this.connectedClients.set(data.userId, client.id);
    this.logger.log(`mapping ${data.userId} with ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client ${client.id} disconnected`);
  }
}
