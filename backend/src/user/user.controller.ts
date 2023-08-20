import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  async create(@Body() userInfo: CreateUserDto) {
    return await this.UserService.create(userInfo);
  }
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) userId: number) {
    const user = await this.UserService.findOne(userId);
    if (!user) throw new NotFoundException();
    return user;
  }
  @Get()
  async getAll() {
    return this.UserService.findAll();
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body()
    updateUserInfo: UpdateUserDto,
  ) {
    const updatedUser = await this.UserService.update(updateUserInfo, userId);
    if (!updatedUser) throw new NotFoundException();
    return this.UserService.findOne(userId);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) userId: number) {
    const deleteStatus = await this.UserService.delete(userId);
    return Boolean(deleteStatus);
  }
}
