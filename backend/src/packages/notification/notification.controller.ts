import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDto } from './dto/create-notification.dto';

@ApiTags('notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Post()
  async createNotification(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationService.create(createNotificationDto);
  }

  @Get(':recipientId')
  async getNotifications(@Param('recipientId') recipientId: number) {
    return this.notificationService.findAllByRecipient(recipientId);
  }

  @Patch('/mark-as-read/:notificationId')
  async markNotificationAsRead(@Param('notificationId') notificationId: number) {
    return this.notificationService.markAsRead(notificationId);
  }

  @Delete(':notificationId')
  async deleteNotification(@Param('notificationId') notificationId: number) {
    return this.notificationService.delete(notificationId);
  }
}
