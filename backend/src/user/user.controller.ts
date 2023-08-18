import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Post()
  create(@Body() UserInfo: CreateUserDto) {
    return this.UserService.create();
  }
}
