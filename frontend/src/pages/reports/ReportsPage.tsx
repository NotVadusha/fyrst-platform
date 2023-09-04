import React from 'react';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { BookingStatistics } from './sections/BookingsStatistics';

export function ReportsPage() {
  return (
    <section className='min-h-full'>
      <Header title='Reports' />
      <div className='px-20 py-10 flex flex-col gap-y-6'>
        <BookingStatistics facilityId={1} startDate={new Date('2022-09-04')} />
      </div>
    </section>
  );
}
