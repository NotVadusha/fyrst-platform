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
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  async create(@Body(ValidationPipe) userInfo: CreateUserDto) {
    return await this.UserService.create(userInfo);
  }
  @Get('/:id')
  async getOne(@Param(ParseIntPipe) userId: number) {
    const user = this.UserService.findOne(userId);
    if (!user) throw new BadRequestException("This user doesn't exist");
    return user;
  }
  @Get()
  async getAll() {
    return this.UserService.findAll();
  }
  @Patch('/:id')
  async update(@Param(ParseIntPipe) userId: number, @Body(ValidationPipe) userInfo: CreateUserDto) {
    const updatedUser = await this.UserService.update(userInfo, userId);
    if (updatedUser.length < 1) throw new BadRequestException("This user doesn't exist");

    return this.UserService.findOne(userId);
  }
  @Delete('/:id')
  async delete(@Param(ParseIntPipe) userId: number) {
    const deleteStatus = await this.UserService.delete(userId);
    if (!deleteStatus) throw new BadRequestException("This user doesn't exist");

    return { Message: 'Successfully deleted' };
  }
}
