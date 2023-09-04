import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permissions } from './entities/permissions.entity';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';

@Injectable()
export class PermissionsService {
  private logger = new Logger(PermissionsService.name);
  constructor(@InjectModel(Permissions) private readonly permissionsModel: typeof Permissions) {}

  async updateByUser(
    userId: number,
    updatePermissionsDto: UpdatePermissionsDto,
  ): Promise<Permissions> {
    const permissions = await this.permissionsModel.findOne({
      where: {
        userId,
      },
      rejectOnEmpty: true,
    });

    this.logger.debug(JSON.stringify(permissions));
    Object.assign(permissions, updatePermissionsDto);

    await permissions.save();

    return permissions;
  }
}
