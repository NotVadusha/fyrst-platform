import { CreateProfileDto } from '../dto/createProfile.dto';

export const profilesMock = (): TestProfile[] => {
  return [
    {
      id: 1,
      user_id: 1,
      languages: ['Eng', 'ukr'],
      description: 'shoto',
      education: 'ONPU',
      sex: 'male',
      avatar: 'urlka',
    },
    {
      id: 2,
      user_id: 2,
      languages: ['Eng', 'ukr'],
      description: 'shoto',
      education: 'CU',
      sex: 'female',
      avatar: 'urlka',
    },
  ];
};

export interface TestProfile extends CreateProfileDto {
  id: number;
}

export const updateInfo = {
  languages: ['Eng', 'ukr'],
  description: 'shoto',
  education: 'CU',
  sex: 'female',
  avatar: 'urlka',
};

export const existingId = 1;
