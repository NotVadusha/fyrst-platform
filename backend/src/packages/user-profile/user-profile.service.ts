import { InjectModel } from '@nestjs/sequelize';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserProfile } from './entities/user-profile.entity';
import { CreateProfileDto } from './dto/createProfile.dto';
import { UserService } from '../user/user.service';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile) private profileRepository: typeof UserProfile,
    private userService: UserService,
  ) {}

  async create(profileInfo: CreateProfileDto) {
    const isUserExist = await this.userService.findOne(profileInfo.user_id);
    if (!isUserExist) throw new NotFoundException('This user doesnt exist');
    const isProfileExist = await this.profileRepository.findOne({
      where: { user_id: profileInfo.user_id },
    });
    if (isProfileExist) throw new ConflictException('Profile for this user is already exist');
    return await this.profileRepository.create({ description: '', ...profileInfo });
  }

  async findAll() {
    return await this.profileRepository.findAll();
  }

  async findOne(userId: number) {
    return await this.profileRepository.findOne({ where: { id: userId } });
  }

  async update(updateInfo: UpdateProfileDto, profileId: number) {
    const [updatedProfile] = await this.profileRepository.update(updateInfo, {
      where: { id: profileId },
    });
    if (!updatedProfile) throw new NotFoundException('This profile doesnt exist');
    return await this.profileRepository.findOne({ where: { id: profileId } });
  }

  async delete(profileId: number) {
    return await this.profileRepository.destroy({ where: { id: profileId } });
  }
}
