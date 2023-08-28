import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem } from 'src/components/ui/common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Button } from 'src/ui/common/Button';
import TextInput from 'src/components/ui/common/TextInput/TextInput';
import { profileSchema } from 'src/lib/validations/profile';
import { AvatarUploader } from './AvatarUploader';
import CustomPhoneInput from './CustomPhoneInput';
import { userApi } from 'src/store/reducers/user/userApi';
import CityInput from './CityInput';
import { useLoaderData } from 'react-router-dom';
import DateInput from './DateInput';
import { UserProfile } from 'types/models/UserProfile';
import { EditUserPage } from 'types/dto/UserDto';
import { Controller } from 'react-hook-form';
type Inputs = y.InferType<typeof profileSchema>;

export function ProfileEditForm() {
  const [isAvatarEditorShown, setAvatarEditorShown] = useState(false);

  const [getUser] = userApi.useGetUserMutation();
  const [updateUser] = userApi.useUpdateUserMutation();
  const [updateUserProfile] = userApi.useUpdateUserProfileMutation();

  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarImage, setAvatarImage] = useState('');
  const [city, setCity] = useState('');

  const { user, userProfile } = useLoaderData() as {
    user: EditUserPage;
    userProfile: UserProfile;
  };

  const form = useForm<Inputs>({
    // @ts-ignore
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: user.first_name,
      secondName: user.last_name,
      email: user.email,
      phoneNumber: user.phone_number,
      city: user.city,
      dateOfBirth: user.birthdate,
    },
  });

  function onSubmit(valuesFromForm: Inputs) {
    const valuesToSend = { ...valuesFromForm, avatar: avatarImage };
    console.log(valuesToSend);
  }

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
                name='firstName'
                render={({ field }) => (
                  <FormItem className=''>
                    <TextInput
                      control={form.control}
                      type='text'
                      id='firstName'
                      label='First name'
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='secondName'
                render={({ field }) => (
                  <FormItem>
                    <TextInput
                      control={form.control}
                      type='text'
                      id='secondName'
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
                name='phoneNumber'
                render={({ field }) => (
                  <FormItem>
                    <CustomPhoneInput
                      control={form.control}
                      type='phone'
                      id='phoneNumber'
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
                  name='dateOfBirth'
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
