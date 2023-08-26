import * as React from 'react';

import { Card, CardContent, CardTitle } from 'src/components/ui/common/Card';
import { GoBackButton } from 'src/components/ui/common/GoBackButton';
import { useParams } from 'react-router-dom';
import { Button } from 'src/ui/common/Button';
import { Header } from 'src/components/ui/layout/Header/Header';
import { useFetchTimecardQuery } from '../../../store/reducers/timecards/timecardsApi';
import { Spinner } from 'src/ui/common/Spinner/Spinner';

export default function ViewTimeCardPage() {
  const { id } = useParams();
  const { data: timecard, isFetching, error } = useFetchTimecardQuery(Number(id));

  console.log(error);

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
                <Button variant='primary'>Submit</Button>
              </div>

              <div className='flex justify-between gap-4'>
                <Card className='w-full max-w-[460px] !p-4  flex-initial'>
                  <CardTitle>Job description</CardTitle>
                  <CardContent>{timecard.booking.notes}</CardContent>
                </Card>
                <Card className='w-full max-w-[400px] !p-4 flex-initial'>
                  <CardTitle>Additional details</CardTitle>
                  <CardContent className='flex flex-col space-y-4 items-start'>
                    <div className='flex justify-between gap-2 w-full'>
                      <span>Employee</span>
                      <span>{`${timecard.employee.firstName} ${timecard.employee.lastName}`}</span>
                    </div>

                    <div className='flex justify-between gap-2 w-full'>
                      <span>Facility manager</span>
                      <span>{`${timecard.facilityManager.firstName} ${timecard.facilityManager.lastName}`}</span>
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
