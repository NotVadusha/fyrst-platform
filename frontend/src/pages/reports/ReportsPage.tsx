import React from 'react';
import { Header } from 'src/common/components/ui/layout/Header/Header';
import { BookingStatistics } from './sections/BookingsStatistics';
import { BookingsByMonth } from './sections/BookingsByMonth';
import { WorkerStats } from './sections/WorkerStats';
import { WorkesByMonth } from './sections/WorkersByMonth';
import { selectUser } from 'src/common/store/slices/packages/user/userSelectors';
import { useAppSelector } from 'src/common/hooks/redux';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';

export function ReportsPage() {
  const user = useAppSelector(selectUser);
  const lastYear = new Date();
  lastYear.setFullYear(lastYear.getFullYear() - 1);

  if (!user.facility_id) {
    return (
      <div className='min-h-full flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <section className='min-h-full'>
      <Header title='Reports' />
      <div className='px-20 py-10 flex flex-col gap-y-10'>
        <BookingStatistics facilityId={user.facility_id} startDate={lastYear} />
        <BookingsByMonth facilityId={user.facility_id} />
        <WorkerStats facilityId={user.facility_id} startDate={lastYear} />
        <WorkesByMonth facilityId={user.facility_id} />
      </div>
    </section>
  );
}
