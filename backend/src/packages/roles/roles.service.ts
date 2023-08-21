import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Roles } from './entities/roles.entity';
import { RoleDto } from './dto/role.dto';
import { BadRequestException, NotAcceptableException } from '@nestjs/common';

@Injectable()
export class RolesService {
  constructor(@InjectModel(Roles) private rolesRepository: typeof Roles) {}

  async create(Role: RoleDto) {
    const sameRoleExist = await this.rolesRepository.findOne({ where: { label: Role.label } });
    if (sameRoleExist) throw new BadRequestException('This role is already exist');
    return await this.rolesRepository.create({ ...Role });
  }

  async findAll() {
    return await this.rolesRepository.findAll();
  }

  async findOne(roleId: number) {
    return await this.rolesRepository.findOne({ where: { id: roleId } });
  }

  async update(RoleInfo: RoleDto, roleId: number) {
    const sameRole = await this.rolesRepository.findOne({ where: { label: RoleInfo.label } });
    if (sameRole && sameRole.id !== roleId)
      throw new NotAcceptableException('This role name is already in use');

    return await this.rolesRepository.update(RoleInfo, { where: { id: roleId } });
  }

  async delete(roleId: number) {
    return await this.rolesRepository.destroy({ where: { id: roleId } });
  }
}
