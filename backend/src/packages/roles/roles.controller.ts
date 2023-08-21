import { RolesService } from './roles.service';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  NotFoundException,
} from '@nestjs/common';
import { RoleDto } from './dto/role.dto';

@Controller('role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  async create(@Body() roleInfo: RoleDto) {
    return await this.rolesService.create(roleInfo);
  }
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) roleId: number) {
    const user = await this.rolesService.findOne(roleId);
    if (!user) throw new NotFoundException();
    return user;
  }
  @Get()
  async getAll() {
    return this.rolesService.findAll();
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) roleId: number,
    @Body()
    roleUpdateInfo: RoleDto,
  ) {
    const updatedUser = await this.rolesService.update(roleUpdateInfo, roleId);
    if (!updatedUser) throw new NotFoundException();
    return this.rolesService.findOne(roleId);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) roleId: number) {
    const deleteStatus = await this.rolesService.delete(roleId);
    return Boolean(deleteStatus);
  }
}
