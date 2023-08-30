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

export default function ViewTimeCardPage() {
  const { id } = useParams();
  const { data: timecard, isFetching, error } = useFetchTimecardQuery(Number(id));
  const [updateTimecard] = useUpdateTimecardMutation();
  const user = useAppSelector(state => state.user);

  function handleSubmitTimecard(facilityManagerId: number) {
    updateTimecard({
      id: Number(id),
      status: TimecardStatus.Approved,
      approvedBy: facilityManagerId,
      approvedAt: new Date().toISOString(),
    });
  }

  function handleRejectTimecard() {
    updateTimecard({
      id: Number(id),
      status: TimecardStatus.Rejected,
      approvedBy: null,
      approvedAt: null,
    });
  }

  return (
    <>
      <Header title='Timecard' />
      <div className='mx-16'>
        <div className='flex flex-col space-y-6 mt-6'>
          <GoBackButton path='/timecard' className='text-dark-grey'>
            All timecards
          </GoBackButton>

          {error ? (
            <p className='text-body-default font-semibold'>Something went wrong</p>
          ) : isFetching || timecard === undefined ? (
            <div className='flex flex-1 items-center'>
              <Spinner />
            </div>
          ) : (
            <>
              <div className='flex items-center justify-between'>
                <h2 className='text-4xl font-bold'>Driver timecard</h2>
                <div className='flex gap-x-4'>
                  <Button
                    variant='primary'
                    onClick={() => handleSubmitTimecard(user.id as number)}
                    disabled={timecard.status === TimecardStatus.Approved}
                  >
                    Submit
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

              <div className='flex justify-between gap-12'>
                <Card className='w-full flex-1 p-4'>
                  <CardTitle>Job description</CardTitle>
                  <CardContent>{timecard.booking.notes}</CardContent>
                </Card>
                <Card className='w-full flex-1 p-4'>
                  <CardTitle>Additional details</CardTitle>
                  <CardContent className='flex flex-col space-y-4 items-start'>
                    <div className='flex justify-between gap-2 w-full'>
                      <span>Employee</span>
                      <span>{`${timecard.employee.first_name} ${timecard.employee.last_name}`}</span>
                    </div>

                    <div className='flex justify-between gap-2 w-full'>
                      <span>Facility manager</span>
                      <span>
                        {timecard.facilityManager
                          ? `${timecard.facilityManager.first_name} ${timecard.facilityManager.last_name}`
                          : 'Not yet approved'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
