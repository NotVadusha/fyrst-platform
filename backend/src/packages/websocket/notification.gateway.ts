import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Notification } from '../notification/entities/notification.entity';
import { NotificationService } from '../notification/notification.service';
import { Server, Socket } from 'socket.io';
import { ServerToClientEvents } from 'shared/packages/notification/types/notificationSocketEvents';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
  namespace: 'notification',
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly notificationService: NotificationService) {}

  @WebSocketServer()
  server: Server<any, ServerToClientEvents>;

  private logger = new Logger('NotificationGateway');

  handleConnection(client: Socket) {
    this.logger.log(`${client} New client connected`);
    client.emit('connection', 'Successfully connected to server');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('Client disconnected' + client.id);
  }

  @SubscribeMessage('createNotification')
  async create(@MessageBody() newNotification: Notification) {
    console.log(newNotification);
    this.sendNotification(newNotification);
  }

  @SubscribeMessage('markNotificationAsRead')
  async markAsRead(@MessageBody() notificationId: number) {
    const updatedNotification = await this.notificationService.markAsRead(notificationId);
    this.updateNotification(updatedNotification);
  }

  sendNotification(notification: Notification) {
    this.server.emit('notificationNew', notification);
  }

  updateNotification(notification: Notification) {
    this.server.emit('notificationUpdate', notification);
  }
}
