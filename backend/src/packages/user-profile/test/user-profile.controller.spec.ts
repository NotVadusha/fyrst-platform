import { UserProfileController } from '../user-profile.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileService } from '../user-profile.service';
import { CreateProfileDto } from '../dto/createProfile.dto';
import { UpdateProfileDto } from '../dto/updateProfile.dto';
import { NotFoundException } from '@nestjs/common';
import { existingId, profilesMock, TestProfile, updateInfo } from './profile.helpers';

describe('UserProfileController', () => {
  let userProfileController: UserProfileController;
  let userProfileService: UserProfileService;
  const defaultProfiles = profilesMock();

  const mockUserProfileService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProfileController],
      providers: [
        {
          provide: UserProfileService,
          useValue: mockUserProfileService,
        },
      ],
    }).compile();

    userProfileController = module.get<UserProfileController>(UserProfileController);
    userProfileService = module.get<UserProfileService>(UserProfileService);
  });

  describe('create', () => {
    it('should create a new profile', async () => {
      const createProfileDto = defaultProfiles[0];
      const expected = { id: 1, ...defaultProfiles[0] };

      mockUserProfileService.create.mockResolvedValue(expected);

      const result = await userProfileController.create(createProfileDto);
      expect(result).toBe(expected);
    });
  });

  describe('getOne', () => {
    it('should get a profile by ID', async () => {
      const expected = defaultProfiles[0];
      mockUserProfileService.findOne.mockResolvedValue(defaultProfiles[0]);

      const result = await userProfileController.getOne(1);
      expect(result).toBe(expected);
    });

    it('should throw NotFoundException if profile does not exist', async () => {
      mockUserProfileService.findOne.mockResolvedValue(null);
      await expect(userProfileController.getOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('getAll', () => {
    it('should get all profiles', async () => {
      const allProfiles = defaultProfiles;

      mockUserProfileService.findAll.mockResolvedValue(allProfiles);

      const result = await userProfileController.getAll();
      expect(result).toBe(allProfiles);
    });
  });

  describe('delete', () => {
    it('should delete a profile', async () => {
      mockUserProfileService.delete.mockResolvedValue(defaultProfiles);
      const result = await userProfileController.delete(1);
      expect(result).toBe(true);
    });

    it('should return false when profile is not deleted', async () => {
      mockUserProfileService.delete.mockResolvedValue(null);
      const result = await userProfileController.delete(-1);
      expect(result).toBe(false);
    });
  });
});
