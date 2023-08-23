import { CreateProfileDto } from './dto/createProfile.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { UserProfileService } from './user-profile.service';
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

@Controller('profile')
export class UserProfileController {
  constructor(private readonly profileService: UserProfileService) {}

  @Post()
  async create(@Body() profileInfo: CreateProfileDto) {
    return await this.profileService.create(profileInfo);
  }
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) profileId: number) {
    const user = await this.profileService.findOne(profileId);
    if (!user) throw new NotFoundException('Profile do not exist');
    return user;
  }
  @Get()
  async getAll() {
    return this.profileService.findAll();
  }
  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) profileId: number,
    @Body()
    updateProfileInfo: UpdateProfileDto,
  ) {
    await this.profileService.update(updateProfileInfo, profileId);
    return await this.profileService.findOne(profileId);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) userId: number) {
    const deleteStatus = await this.profileService.delete(userId);
    return Boolean(deleteStatus);
  }
}
