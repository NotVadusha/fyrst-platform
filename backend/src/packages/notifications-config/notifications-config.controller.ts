import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { NotificationsConfigService } from './notifications-config.service';
import { UpdateNotificationsConfigDto } from './dto/update-config.dto';
import { CreateNotificationsConfigDto } from './dto/create-config-dto';

@ApiTags('Notification config endpoints')
@Controller('notification-config')
export class NotificationsConfigController {
  private readonly logger = new Logger(NotificationsConfigController.name);

  constructor(private readonly notificationsConfigService: NotificationsConfigService) {}

  @Get(':userId')
  async getByUserId(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const config = await this.notificationsConfigService.getByUserId(userId);
      this.logger.log(`Getting notifications config for user ${userId}`);
      return config;
    } catch (e) {
      this.logger.error(`Error getting notifications config for user ${userId}`);
      throw new NotFoundException(`Notification configuration not found`);
    }
  }

  @Post()
  async create(@Body() createNotificationsConfigDto: CreateNotificationsConfigDto) {
    try {
      const config = await this.notificationsConfigService.create(createNotificationsConfigDto);
      this.logger.log(
        `Creating notifications config for user ${createNotificationsConfigDto.userId}`,
      );
      return config;
    } catch (e) {
      this.logger.error(
        `Error creating notifications config for user ${createNotificationsConfigDto.userId}`,
      );
      throw new NotFoundException(`Couldn't create notification configuration`);
    }
  }

  @Patch()
  async update(@Body() updateConfigDto: UpdateNotificationsConfigDto) {
    try {
      const config = await this.notificationsConfigService.update(updateConfigDto);
      this.logger.log(`Updating notifications config for user ${updateConfigDto.userId}`);
      return config;
    } catch (e) {
      this.logger.error(`Error updating notifications config for user ${updateConfigDto.userId}`);
      throw new NotFoundException(`Couldn't update notification configuration`);
    }
  }

  @Delete(':userId')
  async delete(@Param('userId', ParseIntPipe) userId: number) {
    try {
      const config = await this.notificationsConfigService.delete(userId);
      this.logger.log(`Deleting notifications config for user ${userId}`);
      return config;
    } catch (e) {
      this.logger.error(`Error deleting notifications config for user ${userId}`);
      throw new NotFoundException(`Couldn't delete notification configuration`);
    }
  }
}
