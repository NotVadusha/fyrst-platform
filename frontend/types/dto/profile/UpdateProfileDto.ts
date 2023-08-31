import { ProfileDto } from './ProfileDto';

export type UpdateProfileDto = {
  avatar?: string;
  languages?: string[];
  description?: string;
  education?: string;
  sex?: string;
};
