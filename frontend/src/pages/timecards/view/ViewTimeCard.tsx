import * as React from 'react';

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

export default function ViewTimeCardPage() {
  const { id } = useParams();
  const { data: timecard, isFetching } = useFetchTimecardQuery(Number(id));
  const [updateTimecard] = useUpdateTimecardMutation();
  const user = useAppSelector(selectUser);

  function handleSubmitTimecard(facilityManagerId: number) {
    updateTimecard({
      id: Number(id),
      status: TimecardStatus.Approved,
      approvedBy: facilityManagerId,
      approvedAt: new Date().toISOString(),
    });

    toast({ title: 'Success', description: 'Successfully approved timecard' });
  }

  function handleRejectTimecard() {
    updateTimecard({
      id: Number(id),
      status: TimecardStatus.Rejected,
      approvedBy: null,
      approvedAt: null,
    });

    toast({ title: 'Success', description: 'Successfully rejected timecard' });
  }

  if (!timecard && !isFetching) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: 'Timecard not found',
    });
  }

  if (isFetching || !timecard) {
    return (
      <div className='min-h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <Header title='Timecard' />
      <div className='mx-16'>
        <div className='flex flex-col space-y-6 mt-6'>
          <GoBackButton path='/timecard' className='text-dark-grey'>
            All timecards
          </GoBackButton>

          <>
            <div className='flex items-center justify-between'>
              <h2 className='text-4xl font-bold'>{timecard.booking.facility.name} timecard</h2>
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

            <div className='grid grid-cols-8 gap-x-10'>
              <Card className='col-span-5'>
                <CardTitle>Job description</CardTitle>
                <CardContent className='text-black'>{timecard.booking.notes}</CardContent>
              </Card>
              <Card className='col-span-3'>
                <CardTitle>Additional details</CardTitle>
                <CardContent className='flex flex-col space-y-4 items-start text-dark-grey'>
                  <div className='flex justify-between gap-2 w-full'>
                    <span>Employee</span>
                    <span>{`${timecard.employee.first_name} ${timecard.employee.last_name}`}</span>
                  </div>

                  <div className='flex justify-between gap-2 w-full'>
                    <span>Facility</span>
                    <span>{timecard.booking.facility.name}</span>
                  </div>

                  <div className='flex justify-between gap-2 w-full'>
                    <span>Facility manager</span>
                    <span>
                      {timecard.facilityManager
                        ? `${timecard.facilityManager.first_name} ${timecard.facilityManager.last_name}`
                        : 'Not yet approved'}
                    </span>
                  </div>

                  <div className='flex justify-between gap-2 w-full'>
                    <span>Hours worked</span>
                    <span>{`${timecard.hoursWorked} hours`}</span>
                  </div>

                  <div className='flex justify-between gap-2 w-full'>
                    <span>Lunch hours</span>
                    <span>{`${timecard.lunchHours} hours`}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        </div>
      </div>
    </>
  );
}
