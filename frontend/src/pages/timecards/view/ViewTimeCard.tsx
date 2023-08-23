import * as React from 'react';

import { Card, CardContent, CardTitle } from 'src/components/ui/common/Card';
import { CreateTimeCardForm } from 'src/components/CreateTimeCardForm';
import { GoBackButton } from 'src/components/ui/common/GoBackButton';
import { useLoaderData, useParams } from 'react-router-dom';
import { Button } from 'src/ui/common/Button';
import { Header } from 'src/components/ui/layout/Header/Header';

const timecard = {
  employee: 'Guy Hawkings',
  facilityManager: 'Brooklyn Sirsad',
  facility: 'Driver',
  timecardType: 'Hourly',
  hoursWorked: '16 hours',
  lunchTaken: '3 hours',
};

export default function ViewTimeCardPage() {
  const data = useLoaderData();

  console.log(data);

  if (!data) {
    return <div>No timecard found</div>;
  }

  const { id } = useParams();

  // get timecard by id
  console.log(id);

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
            <Card className='w-full max-w-[460px] !p-4'>
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
            <Card className='w-full max-w-[400px] !p-4'>
              <CardTitle>Additional details</CardTitle>
              <CardContent className='flex flex-col space-y-4 items-start'>
                {Object.entries(timecard).map(([key, value]) => (
                  <div className='flex justify-between gap-2' key={key}>
                    <span>{key}</span>
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