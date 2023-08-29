import { InjectModel } from '@nestjs/sequelize';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserProfile } from './entities/user-profile.entity';
import { CreateProfileDto } from './dto/createProfile.dto';
import { UserService } from '../user/user.service';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { BucketService } from '../bucket/bucket.service';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile) private profileRepository: typeof UserProfile,
    private userService: UserService,
    private bucketService: BucketService,
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
    let profile = await this.profileRepository.findOne({ where: { user_id: userId } });
    if (!!profile.avatar)
      profile.avatar = await this.bucketService.getFileLink(
        profile.avatar,
        'read',
        Date.now() + 1000 * 60 * 60 * 24 * 7,
      );
    return profile;
  }

  async update(updateInfo: UpdateProfileDto, userId: number) {
    let avatarUrl = null;
    if (!!updateInfo.avatar) {
      const imgBuffer = Buffer.from(`BASE64_${updateInfo.avatar}`, 'base64');
      avatarUrl = await this.bucketService.save(`avatars/${userId}.png`, imgBuffer);
    }

    const [updatedProfile] = await this.profileRepository.update(
      { ...updateInfo, avatar: avatarUrl },
      {
        where: { user_id: userId },
      },
    );
    if (!updatedProfile) throw new NotFoundException('This profile doesnt exist');
    return await this.profileRepository.findOne({ where: { id: userId } });
  }

  async delete(userId: number) {
    return await this.profileRepository.destroy({ where: { user_id: userId } });
  }
}
