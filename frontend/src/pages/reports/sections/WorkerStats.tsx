import React from 'react';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { useFetchWorkerStatsQuery } from 'src/common/store/api/packages/statistics/statisticsApi';
import { SectionHeader } from '../common/SectionHeader';

export function WorkerStats({ facilityId, startDate }: { facilityId: number; startDate: Date }) {
  const {
    data: stats,
    isFetching: isStatsFetching,
    isError: isStatsError,
  } = useFetchWorkerStatsQuery({
    facilityId: String(facilityId),
    startDate: String(startDate),
  });

  if (isStatsError) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: "Can't fetch booking amount statistics",
    });
  }

  if (isStatsFetching || !stats) {
    return (
      <div className='min-h-[35vh] flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  return (
    <section className='max-h-[35vh]'>
      <SectionHeader>Worker statistics</SectionHeader>
      <ul className='list-disc mx-10'>
        <li>
          <p className='text-body-large'>
            During the last year, a total of of{' '}
            <span className='underline'>{stats.totalWorkers}</span> workers has applied for your
            company&apos;s bookings
          </p>
        </li>
        <li>
          <p className='text-body-large'>
            Which results in average of{' '}
            <span className='underline'>{Math.round(stats.averageWorkers * 100) / 100}</span>{' '}
            workers applied for each your booking
          </p>
        </li>
        <li>
          <p className='text-body-large'>
            And average of{' '}
            <span className='underline'>{Math.round(stats.averagePayment * 100) / 100}$</span> paid
            to each worker
          </p>
        </li>
      </ul>
    </section>
  );
}
