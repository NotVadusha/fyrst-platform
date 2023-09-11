import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Form, FormField, FormItem } from 'src/common/components/ui/common/Form/Form';
import TextInput from 'src/common/components/ui/common/Input/common/TextInput/TextInput';
import { profileSchema } from 'src/common/packages/user/common/user-profile/types/validation-schemas/user-profile.validation-schema';
import { useUpdateUserMutation } from 'src/common/store/api/packages/user/userApi';
import { Button } from 'src/common/components/ui/common/Button';
import { DecodedUser } from 'src/common/packages/user/types/models/User.model';
import * as y from 'yup';
import { AvatarUploader } from './AvatarUploader';
import CityInput from './CityInput';
import CustomPhoneInput from './CustomPhoneInput';
import DateInput from './DateInput';
import { profileApi } from 'src/common/store/api/packages/user-profile/userProfileApi';
import { Buffer } from 'buffer';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import IdCardParser from './IdCardParser';
import defaultAvatar from 'src/assets/icons/default-profile-avatar.svg';
import { UpdateUserBody } from 'src/common/packages/user/types/dto/UserDto';

type Inputs = y.InferType<typeof profileSchema>;
export type parseInfo = {
  first_name: string;
  last_name: string;
  birthDate: Date;
  sex: string;
  documentNumber: string;
};

const capitalize = (text: string) => {
  return `${text[0].toUpperCase()}${text.slice(1).toLowerCase()}`;
};

export function ProfileEditForm() {
  const apiUrl = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState<UpdateUserBody>();
  const [avatarImage, setAvatarImage] = useState('');
  const [parsedData, _setParsedData] = useState<parseInfo>();
  const setParsedData = (data: parseInfo) => {
    _setParsedData(data);
  };
  const [isAvatarEditorShown, setAvatarEditorShown] = useState(false);
  const [city, setCity] = useState<string>('');
  const [updateUser] = useUpdateUserMutation();

  const token = localStorage.getItem('accessToken');
  const decode: DecodedUser = jwtDecode(token as string);
  const userId = decode.id;

  const [updateProfile] = profileApi.useUpdateProfileMutation();
  const [getProfile] = profileApi.useLazyGetProfileQuery();

  useEffect(() => {
    const userFetch = async (id: number) => {
      const data: UpdateUserBody = await (await fetch(`${apiUrl}/user/${id}`)).json();
      setUser(data);

      const profile = await getProfile(userId).unwrap();
      profile?.avatar && setAvatarImage(profile.avatar);
    };

    userFetch(userId);
  }, []);

  useEffect(() => {
    if (parsedData && user) {
      const infoToUpdate: UpdateUserBody = {
        first_name: capitalize(parsedData.first_name),
        last_name: capitalize(parsedData.last_name),
        email: user.email,
        phone_number: user.phone_number,
        city: user.city,
        birthdate: parsedData.birthDate.toISOString().split('T')[0],
        document_number: parsedData.documentNumber,
      };
      setUser(infoToUpdate);
    }
  }, [parsedData]);

  const onSubmit = async (valuesFromForm: Inputs) => {
    if (!!avatarImage && avatarImage.includes('blob:')) {
      const blob = await (await fetch(avatarImage)).blob();
      const arrayBuffer = await blob.arrayBuffer();
      const base64 = Buffer.from(arrayBuffer).toString('base64');

      updateProfile({
        id: userId,
        body: { avatar: base64, sex: parsedData && capitalize(parsedData.sex) },
      });
    }
    if (user) {
      const updateUserReq = {
        id: userId,
        user: {
          ...valuesFromForm,
          birthdate: valuesFromForm.birthdate ? valuesFromForm.birthdate : null,
          document_number: valuesFromForm.document_number ? valuesFromForm.document_number : null,
        },
      };
      updateUser(updateUserReq);

      toast({
        title: 'Changes applied',
        description: 'Your profile updated',
      });
    }
  };

  const openAvatarEditor = () => {
    setAvatarEditorShown(true);
  };
  const form = useForm<Inputs>({
    //@ts-ignore
    resolver: yupResolver(profileSchema),
    defaultValues: {
      first_name: user?.first_name,
      last_name: user?.last_name,
      phone_number: user?.phone_number,
      email: user?.email,
      city: user?.city,
      birthdate: user?.birthdate ?? undefined,
      document_number: user?.document_number,
    },
    shouldFocusError: false,
  });

  useEffect(() => {
    form.reset({ ...user, birthdate: user?.birthdate ?? undefined });
  }, [user]);

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
        <div className='max-w-[512px] p-8 bg-white shadow-xl'>
          <div className='pb-8'>
            <img
              src={avatarImage ? avatarImage : defaultAvatar}
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
                      value={field.value ? field.value : ''}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem>
                    <CityInput
                      control={form.control}
                      {...field}
                      value={field.value ? field.value : ''}
                      setCity={setCity}
                    />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='document_number'
                render={({ field }) => (
                  <FormItem>
                    <TextInput
                      control={form.control}
                      label='Document number'
                      disabled
                      {...field}
                      value={field.value ? field.value : ''}
                    />
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
          <IdCardParser setData={setParsedData} />
        </div>
      )}
    </>
  );
}
