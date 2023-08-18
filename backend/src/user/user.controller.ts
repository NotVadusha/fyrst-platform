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
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) userId: number) {
    const user = await this.UserService.findOne(userId);
    if (!user) throw new BadRequestException("This user doesn't exist");
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
    }: CreateUserDto,
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
    if (updatedUser.length < 1) throw new BadRequestException("This user doesn't exist");

    return this.UserService.findOne(userId);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) userId: number) {
    const deleteStatus = await this.UserService.delete(userId);
    if (!deleteStatus) throw new BadRequestException("This user doesn't exist");

    return { Message: 'Successfully deleted' };
  }
}
