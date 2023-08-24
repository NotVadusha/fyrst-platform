import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Roles } from './entities/roles.entity';
import { RoleDto } from './dto/role.dto';
import { BadRequestException, NotAcceptableException } from '@nestjs/common';

@Injectable()
export class RolesService implements OnModuleInit {
  constructor(@InjectModel(Roles) private rolesRepository: typeof Roles) {}

  async onModuleInit() {
    if ((await this.rolesRepository.count()) === 0)
      this.rolesRepository.create({
        label: 'user',
      });
  }

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
    if (sameRole?.id !== roleId)
      throw new NotAcceptableException('This role name is already in use');

    return await this.rolesRepository.update(RoleInfo, { where: { id: roleId } });
  }

  async delete(roleId: number) {
    return await this.rolesRepository.destroy({ where: { id: roleId } });
  }
}
