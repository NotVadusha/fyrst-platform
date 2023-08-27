import * as React from 'react';

import { Card } from 'src/components/ui/common/Card';
import { CreateTimeCardForm } from 'src/pages/timecards/create/CreateTimeCardForm';
import { GoBackButton } from 'src/components/ui/common/GoBackButton';
import { Header } from 'src/components/ui/layout/Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useCreateTimecardMutation } from '../../../store/reducers/timecards/timecardsApi';
import { CreateTimecardFormValues } from './CreateTimeCardForm';

export default function CreateTimeCardPage() {
  const { bookingId } = useParams();
  const [createTimecard] = useCreateTimecardMutation();
  const navigate = useNavigate();

  function handleCreteTimecardFormSubmit(values: CreateTimecardFormValues) {
    createTimecard({ bookingId: Number(bookingId), createdBy: 1123 });
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
            <CreateTimeCardForm handleSubmit={handleCreteTimecardFormSubmit} />
          </Card>
        </div>
      </div>
    </>
  );
}
