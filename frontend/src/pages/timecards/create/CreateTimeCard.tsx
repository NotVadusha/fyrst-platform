import * as React from 'react';

import { Card } from 'src/components/ui/common/Card';
import { CreateTimeCardForm } from 'src/components/CreateTimeCardForm';
import { GoBackButton } from 'src/components/ui/common/GoBackButton';
import { Header } from 'src/components/ui/layout/Header/Header';

export default function CreateTimeCardPage() {
  return (
    <>
      <Header title='Create timecard' />
      <div className='mx-16'>
        <div className='flex flex-col space-y-6 mt-6'>
          <GoBackButton path='/timecard' className='text-dark-grey'>
            All timecards
          </GoBackButton>
          <h2 className='text-4xl font-bold'>Create timecard</h2>
          <Card className='max-w-[640px]'>
            <CreateTimeCardForm />
          </Card>
        </div>
      </div>
    </>
  );
}
