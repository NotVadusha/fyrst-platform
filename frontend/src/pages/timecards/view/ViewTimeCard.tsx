import React from 'react';
import { Card, CardContent, CardTitle } from 'src/common/components/ui/common/Card/Card';
import { GoBackButton } from 'src/common/components/ui/common/Button/common/go-back-button/GoBackButton';
import { useParams } from 'react-router-dom';
import { Button } from 'src/common/components/ui/common/Button';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import {
  useFetchTimecardQuery,
  useUpdateTimecardMutation,
} from 'src/common/store/api/packages/timecards/timecardsApi';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { TimecardStatus } from 'shared/timecard-status';
import { useAppSelector } from 'src/common/hooks/redux';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { selectUser } from '../../../common/store/slices/packages/user/userSelectors';
import { AdditionalTimeCardInfo } from './AdditionalTimeCardInfo';

export default function ViewTimeCardPage() {
  const { id } = useParams();
  const timecardQuery = useFetchTimecardQuery(Number(id));
  const [updateTimecard] = useUpdateTimecardMutation();
  const user = useAppSelector(selectUser);

  if (!timecardQuery.data && !timecardQuery.isFetching) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Timecard not found',
    });
  }

  if (timecardQuery.isFetching || !timecardQuery.data) {
    return (
      <div className='min-h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }
  const timecard = timecardQuery.data;

  function handleSubmitTimecard(facilityManagerId: number) {
    updateTimecard({
      id: Number(id),
      status: TimecardStatus.Approved,
      approvedBy: facilityManagerId,
      approvedAt: new Date().toISOString(),
    });

    toast({ title: 'Success', description: 'Successfully approved timecard', variant: 'success' });
  }

  function handleRejectTimecard() {
    updateTimecard({
      id: Number(id),
      status: TimecardStatus.Rejected,
      approvedBy: null,
      approvedAt: null,
    });

    toast({ title: 'Success', description: 'Successfully rejected timecard', variant: 'success' });
  }

  return (
    <>
      <Header title='Timecard' />
      <div className='mx-4 max-w-[971px] sm:mx-auto md:px-4 md:mx-auto'>
        <div className='flex flex-col space-y-6 mt-6'>
          <GoBackButton path='/timecard' className='text-dark-grey'>
            All timecards
          </GoBackButton>

          <>
            <div className='flex flex-col md:flex-row items-center justify-between'>
              <h2 className='text-4xl  font-bold mb-4 md:mb-0'>
                {timecard.booking.facility.name} timecard
              </h2>
              <div className='flex gap-x-4'>
                <Button
                  variant='primary'
                  onClick={() => handleSubmitTimecard(user.id as number)}
                  disabled={timecard.status === TimecardStatus.Approved}
                >
                  Approve
                </Button>
                <Button
                  variant='primary'
                  className='bg-red hover:bg-red-2'
                  onClick={() => handleRejectTimecard()}
                  disabled={timecard.status === TimecardStatus.Rejected}
                >
                  Reject
                </Button>
              </div>
            </div>
            <div className='flex flex-col md:flex-row md:justify-between gap-y-4 mx-0'>
              <Card className='w-full! max-w-[515px]'>
                <CardTitle>Job description</CardTitle>
                <CardContent className='text-black'>{timecard.booking.notes}</CardContent>
              </Card>
              <AdditionalTimeCardInfo timecard={timecard} />
            </div>
          </>
        </div>
      </div>
    </>
  );
}
