import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotificationConfig } from './entities/notifications-config.entity';
import { UserService } from '../user/user.service';
import { UpdateNotificationsConfigDto } from './dto/update-config.dto';

@Injectable()
export class NotificationsConfigService {
  constructor(
    @InjectModel(NotificationConfig)
    @Inject(UserService)
    private readonly notificationConfigRepository: typeof NotificationConfig,
    private readonly logger: Logger,
  ) {}

  getByUserId(userId: number) {
    return this.notificationConfigRepository.findOne({
      where: { userId },
    });
  }

  create(userId: number) {
    return this.notificationConfigRepository.create({
      userId,
    });
  }

  async update(userId: number, updatedConfigDto: UpdateNotificationsConfigDto) {
    const config = await this.getByUserId(userId);
    await config.update(updatedConfigDto);
    return this.getByUserId(userId);
  }

  async delete(userId: number) {
    const config = await this.getByUserId(userId);
    await config.destroy();
    this.logger.log(`Removing notifications config for user ${userId}`);
    return config;
  }
}
