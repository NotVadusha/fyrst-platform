import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Notification } from './entities/notification.entity';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway {
  constructor(private readonly notificationService: NotificationService) {}

  @SubscribeMessage('createNotification')
  async create(@MessageBody() createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = await this.notificationService.create(createNotificationDto);
    return notification;
  }

  @SubscribeMessage('findAllNotifications')
  findAll() {
    return this.notificationService.findAll();
  }

  @SubscribeMessage('findNotification')
  findOne(@MessageBody() id: number) {
    return this.notificationService.findOne(id);
  }

  @SubscribeMessage('removeNotification')
  remove(@MessageBody() id: number) {
    return this.notificationService.remove(id);
  }

  @SubscribeMessage('updateNotification')
  update(@MessageBody() updateNotificationDto: UpdateNotificationDto) {
    return this.notificationService.update(updateNotificationDto);
  }
}
