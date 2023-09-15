import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UpdatePermissionsDto } from './dto/update-permissions.dto';
import { Permissions } from './entities/permissions.entity';

@Injectable()
export class PermissionsService {
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

    Object.assign(permissions, updatePermissionsDto);

    await permissions.save();

    return permissions;
  }
}
