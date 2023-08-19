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
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  async create(@Body(ValidationPipe) userInfo: CreateUserDto) {
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
    @Body(ValidationPipe)
    {
      first_name,
      last_name,
      email,
      phone_number,
      city: string,
      birthdate,
      password,
      is_confirmed,
    }: UpdateUserDto,
  ) {
    const updatedUserInfo = {
      first_name,
      last_name,
      email,
      phone_number,
      city: string,
      birthdate,
      password,
      is_confirmed,
    };
    const updatedUser = await this.UserService.update(updatedUserInfo, userId);
    if (!updatedUser) throw new NotFoundException();
    return this.UserService.findOne(userId);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) userId: number) {
    const deleteStatus = await this.UserService.delete(userId);
    if (!deleteStatus) throw new NotFoundException();

    return true;
  }
}
