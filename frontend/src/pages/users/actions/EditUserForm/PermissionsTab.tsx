import React from 'react';
import { useForm, useWatch } from 'react-hook-form';
import Checkbox from 'src/common/components/ui/common/Checkbox/Checkbox';
import { Dropdown } from 'src/common/components/ui/common/Dropdown/Dropdown';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from 'src/common/components/ui/common/Form/Form';
import { EditUserFormValues } from './EditUserForm';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { useFetchFacilitiesQuery } from 'src/common/store/api/packages/facility/facilityApi';
import { useFetchRolesQuery } from 'src/common/store/api/packages/roles/rolesApi';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { roleToText } from '../roleToText';

export interface PermissionsTabProps {
  form: ReturnType<typeof useForm<EditUserFormValues>>;
}

export function PermissionsTab({ form }: PermissionsTabProps) {
  const { data: roles, isFetching: isRolesFetching, isError: isRolesError } = useFetchRolesQuery();
  const {
    data: facilities,
    isFetching: isFacilitiesFetching,
    isError: isFacilitiesError,
  } = useFetchFacilitiesQuery({});
  const roleId = useWatch({ name: 'role_id', control: form.control });

  if (isRolesError || isFacilitiesError) {
    toast({ variant: 'destructive', title: 'Error', description: "Can't fetch necessary data" });
  }

  if (isRolesFetching || !roles || isFacilitiesFetching || !facilities) {
    return (
      <div className='min-h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  const roleOptions = roles.map(role => ({
    label: roleToText(role.label),
    value: role.id,
  }));

  const facilityOptions = facilities
    ? facilities.map(facility => ({
        label: facility.name,
        value: facility.id,
      }))
    : [];

  return (
    <>
      <FormField
        control={form.control}
        name='role_id'
        render={({ field }) => (
          <FormItem className='flex flex-col'>
            <FormControl>
              <Dropdown
                control={form.control}
                name='role_id'
                label='Role'
                options={roleOptions}
                placeholder='Role'
                className='z-20'
              />
            </FormControl>
          </FormItem>
        )}
      />

      <div>
        <FormLabel className='my-1 inline-block'>Email confirmed</FormLabel>
        <Checkbox control={form.control} name='is_confirmed' label='Confirm email?' />
      </div>

      {roleId === 2 && (
        <div className='col-span-3 space-y-4'>
          <div>
            <Dropdown
              className='z-10'
              name='facility_id'
              control={form.control}
              label='Facility'
              options={facilityOptions}
              placeholder='Facility'
            />
          </div>
          <div>
            <FormLabel>Permissions</FormLabel>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
              <Checkbox
                control={form.control}
                name='permissions.manageBookings'
                label='Manage bookings'
              />
              <Checkbox
                control={form.control}
                name='permissions.manageTimecards'
                label='Manage timecards'
              />
              <Checkbox
                control={form.control}
                name='permissions.manageUsers'
                label='Manage users'
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
