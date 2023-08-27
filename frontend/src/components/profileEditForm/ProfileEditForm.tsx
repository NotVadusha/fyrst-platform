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
import { UserApi } from 'src/store/services/user.service/user.service';
import { useNavigate, useLocation } from 'react-router-dom';
import CityInput from './CityInput';
type Inputs = y.InferType<typeof profileSchema>;

export function ProfileEditForm() {
  const [isAvatarEditorShown, setAvatarEditorShown] = useState(false);

  const [getUser] = UserApi.useGetUserMutation();
  const [updateUser] = UserApi.useUpdateUserMutation();
  const [updateUserProfile] = UserApi.useUpdateUserProfileMutation();
  const userToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();
  const location = useLocation();
  // if (!userToken) {
  // navigate('/auth/login', { state: { from: location }, replace: true });
  // }
  //   const userInfo = getUser({ id: userTokenId });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarImage, setAvatarImage] = useState('');
  const [city, setCity] = useState('');

  const form = useForm<Inputs>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: '',
      secondName: '',
      email: '',
      phoneNumber: phoneNumber,
      city: '',
      dateOfBirth: new Date(),
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
              <FormField
                control={form.control}
                name='dateOfBirth'
                render={({ field }) => (
                  <FormItem>
                    {
                      // @ts-ignore
                      <TextInput
                        control={form.control}
                        type='date'
                        id='DateOfBirth'
                        label='Date of birth'
                        {...field}
                      />
                    }
                  </FormItem>
                )}
              />

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
