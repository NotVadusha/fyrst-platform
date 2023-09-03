import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { NotificationService } from '../notification/notification.service';
import { Server, Socket } from 'socket.io';
import { ServerToClientEvents } from 'shared/packages/notification/types/notificationSocketEvents';
import { Logger } from '@nestjs/common';
import { CreateNotificationDto } from 'shared/packages/notification/types/notification';

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
    this.logger.log('Client disconnected');
  }

  async create(notificationDto: CreateNotificationDto) {
    const newNotification = await this.notificationService.create(notificationDto);
    this.server.emit('notificationCreated', newNotification);
  }

  @SubscribeMessage('markNotificationAsRead')
  async markAsRead(@MessageBody() notificationId: number) {
    const updatedNotification = await this.notificationService.markAsRead(notificationId);
    this.server.emit('notificationIsRead', updatedNotification);
  }
}
