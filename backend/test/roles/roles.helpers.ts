import { RoleDto } from 'src/packages/roles/dto/role.dto';

export const rolesMock = (): TestRole[] => {
  return [
    {
      id: 1,
      label: 'first_role',
    },
    {
      id: 2,
      label: 'second_role',
    },
  ];
};

export interface TestRole extends RoleDto {
  id: number;
}

export const updateInfo = {
  id: 1,
  label: 'updated_role',
};

export const existingId = 1;
