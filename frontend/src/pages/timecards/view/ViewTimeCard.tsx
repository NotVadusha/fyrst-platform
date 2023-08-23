import * as React from 'react';

import { Card, CardContent, CardTitle } from 'src/components/ui/common/Card';
import { CreateTimeCardForm } from 'src/components/CreateTimeCardForm';
import { GoBackButton } from 'src/components/ui/common/GoBackButton';
import { useLoaderData, useParams } from 'react-router-dom';
import { Button } from 'src/ui/common/Button';
import { Header } from 'src/components/ui/layout/Header/Header';
import { camelCaseToWords } from 'src/lib/utils';

export default function ViewTimeCardPage() {
  const { timecard } = useLoaderData() as {
    timecard: {
      responsobilities: string[];
      description: string;
      details: Record<string, string>;
    };
  };

  if (!timecard) {
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
            <Button type='primary' label='submit' />
          </div>
          <div className='flex justify-between gap-4'>
            <Card className='w-full max-w-[460px] !p-4  flex-initial'>
              <CardTitle>Job description</CardTitle>
              <CardContent>
                {timecard.description}
                {timecard.responsobilities.length && (
                  <>
                    Common duties and responsibilities for drivers are to:
                    <ul className='mt-4 pl-4 list-disc'>
                      {timecard.responsobilities.map(responsobility => {
                        return <li key={responsobility}>{responsobility}</li>;
                      })}
                    </ul>
                  </>
                )}
              </CardContent>
            </Card>
            <Card className='w-full max-w-[400px] !p-4 flex-initial'>
              <CardTitle>Additional details</CardTitle>
              <CardContent className='flex flex-col space-y-4 items-start'>
                {Object.entries(timecard.details).map(([key, value]) => (
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
