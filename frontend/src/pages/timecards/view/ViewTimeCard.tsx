import * as React from 'react';

import { Card, CardContent, CardTitle } from 'src/components/ui/common/Card';
import { CreateTimeCardForm } from 'src/components/CreateTimeCardForm';
import { GoBackButton } from 'src/components/ui/common/GoBackButton';
import { useLoaderData, useParams } from 'react-router-dom';
import { Button } from 'src/ui/common/Button';
import { Header } from 'src/components/ui/layout/Header/Header';
import { camelCaseToWords } from 'src/lib/utils';

export default function ViewTimeCardPage() {
  const data = useLoaderData() as { timecard: Record<string, string> };

  console.log(data);

  if (!data?.timecard) {
    return <div>No timecard found</div>;
  }

  return (
    <>
      <Header title='Timecard' />
      <div className='mx-16'>
        <div className='flex flex-col space-y-6 mt-6'>
          <GoBackButton path='/timecard' className='text-dark-grey'>
            All timecards
          </GoBackButton>
          <div className='flex items-center justify-between'>
            <h2 className='text-4xl font-bold'>Driver timecard</h2>
            <Button type='primary' label='submit' eventName='Submit' />
          </div>
          <div className='flex justify-between gap-4'>
            <Card className='w-full max-w-[460px] !p-4  flex-initial'>
              <CardTitle>Job description</CardTitle>
              <CardContent>
                Drivers are responsible for transporting clients or handling deliveries in a timely
                manner, and they may have to work nights and weekends to accomplish their duties.
                Common duties and responsibilities for drivers are to:
                <ul>
                  <li>Transport clients and/or packages to and from destinations</li>
                  <li>Arrive at destinations on schedule</li>
                  <li>Fulfill administrative needs, like office pickups</li>
                </ul>
              </CardContent>
            </Card>
            <Card className='w-full max-w-[400px] !p-4 flex-initial'>
              <CardTitle>Additional details</CardTitle>
              <CardContent className='flex flex-col space-y-4 items-start'>
                {Object.entries(data.timecard).map(([key, value]) => (
                  <div className='flex justify-between gap-2 w-full' key={key}>
                    <span>{camelCaseToWords(key)}</span>
                    <span>{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
