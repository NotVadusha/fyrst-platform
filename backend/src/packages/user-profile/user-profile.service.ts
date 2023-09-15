import { InjectModel } from '@nestjs/sequelize';
import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserProfile } from './entities/user-profile.entity';
import { CreateProfileDto } from './dto/createProfile.dto';
import { UserService } from '../user/user.service';
import { UpdateProfileDto } from './dto/updateProfile.dto';
import { NotificationsConfigService } from '../notifications-config/notifications-config.service';
import { BucketService } from '../bucket/bucket.service';
import * as crypto from 'crypto';
import { WEEK_IN_MILLISECONDS } from 'src/helpers/constants';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectModel(UserProfile) private profileRepository: typeof UserProfile,
    private userService: UserService,
    private notificationsConfigService: NotificationsConfigService,
    private bucketService: BucketService,
  ) {}

  async create(profileInfo: CreateProfileDto) {
    const isUserExist = await this.userService.findOne(profileInfo.user_id);
    if (!isUserExist) throw new NotFoundException('This user doesnt exist');
    const isProfileExist = await this.profileRepository.findOne({
      where: { user_id: profileInfo.user_id },
    });
    if (isProfileExist) throw new ConflictException('Profile for this user already exists');
    this.notificationsConfigService.create({ userId: profileInfo.user_id });
    return await this.profileRepository.create({ description: '', ...profileInfo });
  }

  async findAll() {
    return await this.profileRepository.findAll();
  }

  async findOne(userId: number) {
    const profile = await this.profileRepository.findOne({ where: { user_id: userId } });
    if (!profile) throw new NotFoundException('User profile not found');
    if (profile?.avatar)
      profile.avatar = await this.bucketService.getFileLink(
        profile.avatar,
        'read',
        Date.now() + WEEK_IN_MILLISECONDS,
      );
    delete profile.stripeAccountId;
    return profile;
  }

  async update(updateInfo: UpdateProfileDto, userId: number) {
    let avatar = null;

    if (!!updateInfo.avatar) {
      const { fileTypeFromBuffer } = await (eval('import("file-type")') as Promise<
        typeof import('file-type')
      >);

      const imgBuffer = Buffer.from(updateInfo.avatar, 'base64');
      const fileType = await fileTypeFromBuffer(imgBuffer);
      const fileName = `${userId}_${crypto.randomUUID()}.${fileType.ext}`;
      await this.bucketService.save(`avatars/${fileName}`, imgBuffer);
      avatar = `avatars/${fileName}`;

      const profile = await this.profileRepository.findOne({
        where: { user_id: userId },
      });
      if (!!profile.avatar) await this.bucketService.delete(profile.avatar);
    }

    const [updatedProfile] = await this.profileRepository.update(
      { ...updateInfo, avatar },
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

  async haveStripeAccount(userId: number) {
    const profile = await this.profileRepository.findOne({
      where: {
        user_id: userId,
      },
    });
    return {
      stripeAccount: !!profile.stripeAccountId,
    };
  }
}
