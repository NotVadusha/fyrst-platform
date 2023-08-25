import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormItem, FormLabel } from 'src/components/ui/common/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as y from 'yup';
import { Button } from 'src/ui/common/Button';
import TextInput from 'src/components/ui/common/TextInput/TextInput';
import { profileSchema } from 'src/lib/validations/profile';
import { AvatarUploader } from './AvatarUploader';
import CustomPhoneInput from './CustomPhoneInput';
import { Dropdown } from 'src/components/ui/common/Dropdown/Dropdown';

type Inputs = y.InferType<typeof profileSchema>;

export function ProfileEditForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [avatarImage, setAvatarImage] = useState('');
  const [isAvatarEditorShown, setAvatarEditorShown] = useState(false);
  const [selectedYear, setYear] = useState('2000');
  const [selectedMonth, setMonth] = useState('1');
  const [selectedDay, setDay] = useState('1');

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
  const years = [...Array(100)].map(year => (2000 - year).toString()); // Change the range as needed
  const months = [...Array(12)].map(month => (month + 1).toString());
  const days = [...Array(31)].map(day => (day + 1).toString());
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
                        defaultValue={selectedDay}
                        options={days}
                        label=''
                        placeholder='Day'
                        namespace=''
                      />
                      <Dropdown
                        defaultValue={selectedMonth}
                        options={months}
                        label=''
                        placeholder='Month'
                        namespace=''
                      />
                      <Dropdown
                        defaultValue={selectedYear}
                        options={years}
                        label=''
                        placeholder='Year'
                        namespace=''
                      />
                    </FormItem>
                  </>
                )}
              ></FormField>

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
