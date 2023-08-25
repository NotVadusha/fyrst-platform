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
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) userId: number) {
    const user = await this.userService.findOne(userId);
    if (!user) throw new NotFoundException();
    return user;
  }
  @Get()
  async getAllByParams(
    @Query('currentPage', ParseIntPipe) currentPage: number,
    @Query('name') name: string = '',
    @Query('email') email: string = '',
    @Query('city') city: string = '',
    @Query('emailConfirmed') is_confirmed?: boolean,
    @Query('birthDate') birthdate?: Date,
  ): Promise<{
    users: User[];
    totalCount: number;
  }> {
    const filters = new UserFiltersDto();

    const [first_name, last_name] = name.split(' ');

    Object.assign(filters, {
      first_name,
      last_name,
      email,
      city,
      is_confirmed,
      birthdate,
    });

    console.log(filters);

    // data: User[], total: number
    return this.userService.getAllByParams({ currentPage, filters });
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body()
    updateUserInfo: UpdateUserDto,
  ) {
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
