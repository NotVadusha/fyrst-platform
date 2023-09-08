import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { MultiTabForm } from 'src/common/components/ui/common/MultiTabForm/MultiTabForm';
import { User } from 'src/common/packages/user/types/models/User.model';
import { userSchema } from 'src/common/packages/user/types/validation-schemas/user.validation-schema';
import * as y from 'yup';
import { PermissionsTab } from './PermissionsTab';
import { PersonalInfoTab } from './PeronalInfoTab';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { TabComponentProps } from 'src/common/components/ui/common/MultiTabForm/MultiTabForm';
import { hasRole } from 'src/common/helpers/authorization/hasRole';
import { useAppSelector } from 'src/common/hooks/redux';
import { selectUser } from 'src/common/store/slices/packages/user/userSelectors';

export type EditUserFormValues = y.InferType<typeof userSchema>;
interface EditUserFormProps {
  user?: User;
  isLoading: boolean;
  onSubmit: (values: EditUserFormValues) => void;
}

export function EditUserForm({ user, isLoading, onSubmit }: EditUserFormProps) {
  let tabComponents: React.FC<TabComponentProps<EditUserFormValues>>[];
  let tabCaptions: string[];
  const currentUser = useAppSelector(selectUser);

  const form = useForm<EditUserFormValues>({
    resolver: yupResolver<EditUserFormValues>(userSchema),
    defaultValues: {
      birthdate: user?.birthdate || undefined,
      city: user?.city || '',
      email: user?.email || '',
      is_confirmed: user?.is_confirmed || false,
      first_name: user?.first_name || '',
      last_name: user?.last_name || '',
      phone_number: user?.phone_number || '',
      role_id: user?.role_id || 1,
      facility_id: user?.facility_id || 1,
      permissions: {
        manageBookings: user?.permissions.manageBookings || false,
        manageTimecards: user?.permissions.manageTimecards || false,
        manageUsers: user?.permissions.manageUsers || false,
      },
    },
    shouldFocusError: false,
  });

  if (!currentUser.role) {
    return (
      <div className='flex item-center justify-center'>
        <Spinner />
      </div>
    );
  }

  if (hasRole('PLATFORM_ADMIN', currentUser as User, false)) {
    tabComponents = [PersonalInfoTab, PermissionsTab];
    tabCaptions = ['Personal info', 'Permissions'];
  } else {
    tabComponents = [PersonalInfoTab];
    tabCaptions = ['Personal info'];
  }

  return (
    <MultiTabForm<EditUserFormValues>
      form={form}
      tabComponents={tabComponents}
      onSubmit={onSubmit}
      isLoading={isLoading}
      tabCaptions={tabCaptions}
    />
  );
}
