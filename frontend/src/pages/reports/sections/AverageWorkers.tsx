import React from 'react';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { useFetchAverageWorkersQuery } from 'src/common/store/api/packages/statistics/statisticsApi';

export function AverageWorkers({ facilityId, startDate }: { facilityId: number; startDate: Date }) {
  const {
    data: stats,
    isFetching: isStatsFetching,
    isError: isStatsError,
  } = useFetchAverageWorkersQuery({
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
      <h2 className='text-h2 font-bold'>Average workers</h2>
      <p className='text-h5 font-semibold'>
        During the last month, an average of{' '}
        <span className='underline'>{Math.round(stats.averageWorkers * 100) / 100}</span> workers
        has applied for your company&apos;s bookings
      </p>
    </section>
  );
}
