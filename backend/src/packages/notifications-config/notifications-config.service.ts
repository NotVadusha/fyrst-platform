import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { NotificationsConfig } from './entities/notifications-config.entity';
import { UserService } from '../user/user.service';
import { UpdateNotificationsConfigDto } from './dto/update-config.dto';
import { CreateNotificationsConfigDto } from './dto/create-config-dto';

@Injectable()
export class NotificationsConfigService {
  constructor(
    @InjectModel(NotificationsConfig)
    @Inject(UserService)
    private readonly notificationConfigRepository: typeof NotificationsConfig,
  ) {}

  async getByUserId(userId: number): Promise<NotificationsConfig> {
    const config = await this.notificationConfigRepository.findOne({
      where: { userId },
    });

    return config;
  }

  async create(
    createNotificationsConfigDto: CreateNotificationsConfigDto,
  ): Promise<NotificationsConfig> {
    const config = await this.notificationConfigRepository.build(
      createNotificationsConfigDto as Partial<NotificationsConfig>,
    );
    const created = await config.save();

    return this.getByUserId(created.userId);
  }

  async update(updatedConfigDto: UpdateNotificationsConfigDto): Promise<NotificationsConfig> {
    const config = await this.getByUserId(updatedConfigDto.userId);
    Object.assign(config, updatedConfigDto);
    await config.save();
    return this.getByUserId(updatedConfigDto.userId);
  }

  async delete(userId: number) {
    const config = await this.getByUserId(userId);
    await config.destroy();
    return config;
  }
}
