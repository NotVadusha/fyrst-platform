import { AccessTokenGuard } from '../auth/guards/access-token.guard';
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
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User profile endpoints')
@UseGuards(AccessTokenGuard)
@Controller('profile')
export class UserProfileController {
  constructor(private readonly profileService: UserProfileService) {}

  @Post()
  async create(@Body() profileInfo: CreateProfileDto) {
    return await this.profileService.create(profileInfo);
  }
  @Get(':id')
  async getOne(@Param('id', ParseIntPipe) userId: number) {
    const userProfile = await this.profileService.findOne(userId);
    if (!userProfile) throw new NotFoundException('Profile do not exist');
    return userProfile;
  }
  @Get()
  async getAll() {
    return this.profileService.findAll();
  }

  @Patch()
  async updateByToken(
    @Request() req,
    @Body()
    updateProfileInfo: UpdateProfileDto,
  ) {
    await this.profileService.update(updateProfileInfo, req.user['id']);
    return await this.profileService.findOne(req.user['id']);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) userId: number,
    @Body()
    updateProfileInfo: UpdateProfileDto,
  ) {
    await this.profileService.update(updateProfileInfo, userId);
    return await this.profileService.findOne(userId);
  }
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) userId: number) {
    const deleteStatus = await this.profileService.delete(userId);
    return Boolean(deleteStatus);
  }
}
