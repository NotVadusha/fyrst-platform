import * as React from 'react';

import { Card } from 'src/common/components/ui/common/Card/Card';
import { CreateTimeCardForm } from 'src/pages/timecards/create/CreateTimeCardForm';
import { GoBackButton } from 'src/common/components/ui/common/Button/common/go-back-button/GoBackButton';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateTimecardMutation } from 'src/common/store/reducers/timecards/timecardsApi';
import { CreateTimecardFormValues } from './CreateTimeCardForm';
import { useAppSelector } from 'src/common/hooks/redux';
import { User } from 'src/common/types';

export default function CreateTimeCardPage() {
  const { bookingId } = useParams();
  const [createTimecard] = useCreateTimecardMutation();
  const navigate = useNavigate();

  const user = useAppSelector(state => state.user);

  function handleCreteTimecardFormSubmit(values: CreateTimecardFormValues) {
    createTimecard({ bookingId: Number(bookingId), createdBy: Number(user.id) });
    navigate(`/booking/${bookingId}`);
  }

  return (
    <>
      <Header title='Create timecard' />
      <div className='mx-16'>
        <div className='flex flex-col space-y-6 py-6'>
          <GoBackButton path='/timecard' className='text-dark-grey'>
            All timecards
          </GoBackButton>
          <h2 className='text-4xl font-bold'>Create timecard</h2>
          <Card className='max-w-[640px]'>
            <CreateTimeCardForm handleSubmit={handleCreteTimecardFormSubmit} user={user as User} />
          </Card>
        </div>
      </div>
    </>
  );
}
