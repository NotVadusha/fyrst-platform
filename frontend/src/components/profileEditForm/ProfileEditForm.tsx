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
import { Dropdown } from '../common/Dropdown/Dropdown';
import { useRef } from 'react';
const src =
  'https://media.gettyimages.com/id/1410292561/photo/portrait-of-smiling-elderly-bald-man.jpg?s=612x612&w=gi&k=20&c=2EpnI1qluV0iRGpjBo6xEeNAgiVwcUNCcSI-6kYHFIU=';

type Inputs = y.InferType<typeof profileSchema>;

export function ProfileEditForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarImage, setAvatarImage] = useState('');
  const [isAvatarEditorShown, setAvatarEditorShown] = useState(false);

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
    console.log(values, avatarImage);
  }

  const openAvatarEditor = () => {
    setAvatarEditorShown(true);
  };
  const days = ['1', '2'];
  const monthes = ['December'];
  const years = ['2000', '2001'];
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
              src={
                avatarImage
                  ? avatarImage
                  : 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'
              }
              alt='profileImg'
              className='w-32 h-32 rounded-full mx-auto'
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
                  <FormItem>
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
                  <FormItem>
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
              <FormField
                control={form.control}
                name='dateOfBirth'
                render={({ field }) => (
                  <>
                    <FormLabel className='mt-8 mb-2 block'>Date of birth</FormLabel>
                    <div className='flex flex-row'></div>
                    <FormItem>
                      <Dropdown
                        defaultValue={days[0]}
                        options={days}
                        label=''
                        placeholder='Day'
                        namespace=''
                      />
                      <Dropdown
                        defaultValue={monthes[0]}
                        options={monthes}
                        label=''
                        placeholder='Month'
                        namespace=''
                      />
                      <Dropdown
                        defaultValue={years[0]}
                        options={years}
                        label=''
                        placeholder='Year'
                        namespace=''
                      />
                    </FormItem>
                  </>
                )}
              ></FormField>

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
