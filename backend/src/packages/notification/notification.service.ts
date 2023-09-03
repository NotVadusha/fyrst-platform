import { Injectable } from '@nestjs/common';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { Notification } from './entities/notification.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification)
    private readonly notificationRepository: typeof Notification,
  ) {}

  async create(createNotificationDto: CreateNotificationDto): Promise<Notification> {
    const notification = await this.notificationRepository.create(
      createNotificationDto as Partial<Notification>,
    );
    return notification;
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
