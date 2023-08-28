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
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { UserFiltersDto } from './dto/user-filters.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() userInfo: CreateUserDto) {
    return await this.userService.create(userInfo);
  }

  @Get('/many')
  async getAll() {
    return await this.userService.findAll();
  }

  @Post('/many')
  async createMany(@Body() userInfo: CreateUserDto[]) {
    return await this.userService.createMany(userInfo);
  }

  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException();
    return user;
  }

  @Get()
  async getAllByParams(@Query() query: UserFiltersDto): Promise<{
    users: User[];
    totalCount: number;
  }> {
    return this.userService.getAllByParams({
      currentPage: Number(query.currentPage),
      filters: {
        birthdate: query.birthdate,
        city: query.city,
        email: query.email,
        first_name: query.first_name,
        is_confirmed: query.is_confirmed,
        last_name: query.last_name,
      },
    });
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body()
    updateUserInfo: UpdateUserDto,
  ) {
    console.log(userId, updateUserInfo);
    const updatedUser = await this.userService.update(updateUserInfo, userId);
    if (!updatedUser) throw new NotFoundException();
    return this.userService.findOne(userId);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) userId: number) {
    const deleteStatus = await this.userService.delete(userId);
    return Boolean(deleteStatus);
  }
}
