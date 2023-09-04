import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useFetchBookingsAmountStatisticsQuery } from 'src/common/store/api/packages/statistics/statisticsApi';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';

ChartJS.register(ArcElement, Tooltip, Legend);

export function BookingStatistics({
  facilityId,
  startDate,
}: {
  facilityId: number;
  startDate: Date;
}) {
  const {
    data: stats,
    isFetching: isStatsFetching,
    isError: isStatsError,
  } = useFetchBookingsAmountStatisticsQuery({
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

  const chartData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: '# of Votes',
        data: [stats.completed, stats.pending],
        backgroundColor: ['rgb(38, 196, 133)', 'rgb(8, 61, 119)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: { display: true },
    },
  };

  return (
    <section className='max-h-[35vh] grid grid-cols-3'>
      <div className='col-span-2'>
        <h2 className='text-h2 font-bold'>Amount of bookings</h2>
        <p className='text-h5 font-semibold'>
          In last month your company submitted total of{' '}
          <span className='underline'>{stats.total}</span> bookings.{' '}
          <span className='underline'>{stats.completed}</span> of them were completed and{' '}
          <span className='underline'>{stats.pending}</span> of them are still pending.
        </p>
      </div>
      <div className='col-span-1 text-center'>
        <Pie data={chartData} options={chartOptions} />
        <span className='mt-2 inline-block text-grey'>Completed to pending ratio</span>
      </div>
    </section>
  );
}
