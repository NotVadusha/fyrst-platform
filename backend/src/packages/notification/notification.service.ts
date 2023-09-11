import { NotificationsConfigService } from '../notifications-config/notifications-config.service';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
import { InjectModel } from '@nestjs/sequelize';
import { NotificationGateway } from '../websocket/notification.gateway';
@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private notificationRepository: typeof Notification,
    @Inject(NotificationGateway)
    private notificationGateway: NotificationGateway,
    @Inject(NotificationsConfigService)
    private NotificationsConfigService: NotificationsConfigService,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const settingsState = await this.NotificationsConfigService.getByUserId(
      createNotificationDto.recipientId,
    );

    if (settingsState[createNotificationDto.type]) {
      const notification = await this.notificationRepository.create({
        ...createNotificationDto,
      });
      this.notificationGateway.create(notification);
      return notification;
    }
    return;
  }

  async findAllByRecipient(recipientId: number): Promise<Notification[]> {
    return this.notificationRepository.findAll({
      where: { recipientId },
      order: [['createdAt', 'DESC']],
    });
  }

  async markAsRead(notificationId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findByPk(notificationId);
    notification.isRead = true;
    await notification.save();
    return notification;
  }

  async delete(notificationId: number): Promise<Notification> {
    const notification = await this.notificationRepository.findByPk(notificationId);
    notification.destroy();
    return notification;
  }
}
