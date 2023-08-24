import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel, FormMessage } from '../common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Button } from '../../../ui/common/Button';
import TextInput from '../common/TextInput/TextInput';
import { profileSchema } from '../../../lib/validations/profile';
import { AvatarUploader } from './AvatarUploader';
import styles from './PhoneInput.module.css';
import CustomPhoneInput from './CustomPhoneInput';
const src =
  'https://media.gettyimages.com/id/1410292561/photo/portrait-of-smiling-elderly-bald-man.jpg?s=612x612&w=gi&k=20&c=2EpnI1qluV0iRGpjBo6xEeNAgiVwcUNCcSI-6kYHFIU=';

type Inputs = y.InferType<typeof profileSchema>;

export function ProfileEditForm() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const form = useForm<Inputs>({
    resolver: yupResolver(profileSchema),
    defaultValues: {
      firstName: '',
      secondName: '',
      email: '',
      phoneNumber: phoneNumber,
      city: '',
      dateOfBirth: new Date('12.12.2004'),
    },
  });

  function onSubmit(values: Inputs) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }
  const [isAvatarEditorShown, _setAvatarEditorShown] = useState(false);
  const setAvatarEditorShown = (state: boolean) => {
    _setAvatarEditorShown(state);
  };
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      {isAvatarEditorShown ? (
        <AvatarUploader
          image={src}
          width={125}
          height={125}
          border={0}
          isShown={isAvatarEditorShown}
          setShown={setAvatarEditorShown}
        />
      ) : (
        <div className='w-128 p-8 bg-white mx-20 shadow-xl'>
          <div className='pb-8'>
            <img
              src='https://media.gettyimages.com/id/1410292561/photo/portrait-of-smiling-elderly-bald-man.jpg?s=612x612&w=gi&k=20&c=2EpnI1qluV0iRGpjBo6xEeNAgiVwcUNCcSI-6kYHFIU='
              alt='profileImg'
              className='w-32 h-32 rounded-full mx-auto'
            />
            <p
              className='cursor-pointer w-fit mx-auto pt-4 text-blue body-small font-medium'
              onClick={() => {
                _setAvatarEditorShown(true);
              }}
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
                  <FormItem className='flex flex-col'>
                    <TextInput
                      control={form.control}
                      type='text'
                      id='text'
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
                  <FormItem className='flex flex-col'>
                    <TextInput
                      control={form.control}
                      type='text'
                      id='text'
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
                  <FormItem className='flex flex-col'>
                    <TextInput
                      control={form.control}
                      type='text'
                      id='text'
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
                  <FormItem className='flex flex-col'>
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
                  <FormItem className='flex flex-col'>
                    <TextInput
                      control={form.control}
                      type='text'
                      id='text'
                      label='City'
                      {...field}
                    />
                  </FormItem>
                )}
              />
              <FormLabel>Date of birth</FormLabel>
              <input type=''></input>
              <Button
                btnType='submit'
                eventName='submit'
                label='Save'
                type='primary'
                fullWidth={true}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      )}
    </>
  );
}
