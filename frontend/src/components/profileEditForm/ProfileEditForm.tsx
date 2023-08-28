import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem } from 'src/components/ui/common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Button } from 'src/ui/common/Button';
import TextInput from 'src/components/ui/common/TextInput/TextInput';
import { profileSchema } from 'src/lib/validations/profile';
import { AvatarUploader } from './AvatarUploader';
import CustomPhoneInput from './CustomPhoneInput';
import {
  useGetUserQuery,
  useUpdateUserMutation,
  useUpdateUserProfileMutation,
} from 'src/store/reducers/user/userApi';
import CityInput from './CityInput';
import DateInput from './DateInput';
import { Controller } from 'react-hook-form';
import { User } from 'types';
import { useStore } from 'react-redux';
type Inputs = y.InferType<typeof profileSchema>;

export function ProfileEditForm() {
  const [isAvatarEditorShown, setAvatarEditorShown] = useState(false);

  const [avatarImage, setAvatarImage] = useState('');
  const [city, setCity] = useState('');
  const [updateUser] = useUpdateUserMutation();
  const store = useStore();

  const user: User = store.getState().user;

  const form = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(profileSchema),
    defaultValues: useMemo(() => {
      return user;
    }, [user]),
  });

  const onSubmit = async (valuesFromForm: Inputs) => {
    const response = await updateUser({ id: user.id, user: { ...valuesFromForm } });
  };

  const openAvatarEditor = () => {
    setAvatarEditorShown(true);
  };

  return (
    <>
      {isAvatarEditorShown ? (
        <AvatarUploader
          savedImage={avatarImage}
          width={500}
          height={500}
          border={40}
          isShown={isAvatarEditorShown}
          setShown={setAvatarEditorShown}
          setImage={setAvatarImage}
        />
      ) : (
        <div className='w-128 p-8 bg-white mx-20 shadow-xl'>
          <div className='pb-8'>
            <img
              src={avatarImage}
              className='w-32 h-32 rounded-full mx-auto border border-placeholder'
            />
            <p
              className='cursor-pointer w-fit mx-auto pt-4 text-blue body-small font-medium'
              onClick={openAvatarEditor}
            >
              Set new photo
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='first_name'
                render={({ field }) => (
                  <FormItem className=''>
                    <TextInput
                      control={form.control}
                      type='text'
                      id='first_name'
                      label='First name'
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='last_name'
                render={({ field }) => (
                  <FormItem>
                    <TextInput
                      control={form.control}
                      type='text'
                      id='last_name'
                      label='Second name'
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <TextInput
                      control={form.control}
                      type='text'
                      id='Email'
                      label='Email'
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='phone_number'
                render={({ field }) => (
                  <FormItem>
                    <CustomPhoneInput
                      control={form.control}
                      type='phone'
                      id='phone_number'
                      label='Phone'
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <CityInput control={form.control} {...field} setCity={setCity} />
                  </FormItem>
                )}
              />
              <div>
                <Controller
                  name='birthdate'
                  control={form.control}
                  render={({ field }) => (
                    <DateInput control={form.control} label='Date of birth' {...field} />
                  )}
                />
              </div>
              <Button type='submit' className='w-full'>
                Submit
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
