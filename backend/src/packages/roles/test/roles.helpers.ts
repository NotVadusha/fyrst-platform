import { RoleDto } from '../dto/role.dto';

export const rolesMock = (): TestRole[] => {
  return [
    {
      role_id: 1,
      label: 'first_role',
    },
    {
      role_id: 2,
      label: 'second_role',
    },
  ];
};

export interface TestRole extends RoleDto {
  role_id: number;
}

export const updateInfo = {
  role_id: 1,
  label: 'updated_role',
};

export const existingId = 1;
