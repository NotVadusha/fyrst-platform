import React, { useEffect, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardTitle } from 'src/common/components/ui/common/Card/Card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from 'src/common/components/ui/common/Form/Form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/common/components/ui/common/Select/Select';
import * as yup from 'yup';
import TextInput from 'src/common/components/ui/common/Input/common/TextInput/TextInput';
import { Textarea } from 'src/common/components/ui/common/Textarea/Textarea';
import { Button } from 'src/common/components/ui/common/Button';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { useUpdateUserProfileMutation } from 'src/common/store/api/packages/user/userApi';
import { useAppSelector } from 'src/common/hooks/redux';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { useNavigate } from 'react-router-dom';
import { profileApi } from 'src/common/store/api/packages/user-profile/userProfileApi';
import { ProfileDto } from 'src/common/packages/user/common/user-profile/types/dto/ProfileDto';
import { X } from 'lucide-react';

const portfolioSchema = yup.object().shape({
  sex: yup.mixed().oneOf(['male', 'female', '']),
  education: yup.string(),
  description: yup.string(),
});

const apiUrl = process.env.REACT_APP_API_URL;

type Inputs = yup.InferType<typeof portfolioSchema>;

export default function PortfolioPage() {
  const user = useAppSelector(state => state.user);
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileDto>();
  const [languages, setSelectedLanguages] = useState<string[]>([]);

  const [langValue, setLangValue] = useState<string>('');

  const form = useForm({
    resolver: yupResolver<Inputs>(portfolioSchema),
    defaultValues: profile,
  });

  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [getProfile] = profileApi.useLazyGetProfileQuery();

  function onSubmit(values: Inputs) {
    updateUserProfile({
      description: values.description,
      education: values.education,
      sex: values.sex as string,
      languages,
    })
      .unwrap()
      .then(res => toast({ title: 'Portfolio updated' }))
      .catch(err => err);
  }

  useEffect(() => {
    const userFetch = async (id?: number) => {
      if (!id) return;
      const data = await (await fetch(`${apiUrl}/user/${id}`)).json();

      if (data.statusCode === 404) navigate('/auth/signin');

      const profile = await getProfile(data.id).unwrap();
      setProfile(profile);
      setSelectedLanguages(profile?.languages ?? []);
      form.reset(profile);
    };

    if (!profile) userFetch(user.id);
  }, [user]);

  return (
    <div>
      <Header title='Profile' />
      <div className='px-12 w-full'>
        <Card className='max-w-[450px] mt-8'>
          <CardTitle>
            <h5 className='text-dark-grey text-xl font-semibold'>Edit your Portfolio</h5>
          </CardTitle>
          <CardContent>
            <Form {...form}>
              <form className='space-y-4' onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name='education'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Your education</FormLabel>
                      <FormControl>
                        <TextInput label='education' control={form.control} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='sex'
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={val => {
                          setProfile(prev => ({ ...prev, sex: val as string }));
                          field.onChange(val);
                        }}
                        value={profile?.sex ?? ''}
                        defaultValue={profile?.sex}
                      >
                        <FormLabel>Your sex</FormLabel>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Choose your sex' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value='male'>male</SelectItem>
                          <SelectItem value='female'>female</SelectItem>
                          <SelectItem value={''}>prefer not to say</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Something about yourself</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <label className='text-blue font-medium'>Languages</label>
                  <div className='flex gap-2 my-2'>
                    {languages?.map((lang, i) => (
                      <div
                        key={`${i}-${lang}`}
                        className='px-2 py-1 flex items-center gap-2 border border-grey rounded-md w-fit'
                      >
                        {lang}
                        <Button
                          className='p-0 w-fit h-fit bg-transparent hover:bg-transparent active:bg-transparent'
                          type='button'
                          onClick={e => {
                            e.preventDefault();
                            setSelectedLanguages(prev => [...prev.filter(l => l !== lang)]);
                          }}
                        >
                          <X className='w-4 h-4 text-grey hover:text-blue' />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <TextInput
                    label='language'
                    control={undefined}
                    name='language'
                    value={langValue}
                    onChange={e => setLangValue(e.target.value)}
                    onKeyDown={e => {
                      console.log(e);
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedLanguages(prev => {
                          if (prev.length >= 3 || prev.includes(langValue)) return prev;
                          else {
                            setLangValue('');
                            return [...prev, langValue];
                          }
                        });
                      }
                    }}
                  />
                </div>
                <Button className='w-full'>Save</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
