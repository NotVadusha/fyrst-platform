import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { toast } from 'src/common/components/ui/common/Toast/useToast';
import { Spinner } from 'src/common/components/ui/common/Spinner/Spinner';
import { useFetchWorkersByMonthQuery } from 'src/common/store/api/packages/statistics/statisticsApi';
import { SectionHeader } from '../common/SectionHeader';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export function WorkesByMonth({ facilityId }: { facilityId: number }) {
  const {
    data: stats,
    isFetching: isStatsFetching,
    isError: isStatsError,
  } = useFetchWorkersByMonthQuery({
    facilityId: String(facilityId),
  });

  if (isStatsError) {
    toast({
      variant: 'destructive',
      title: 'Error',
      description: "Can't fetch workers by month statistics",
    });
  }

  if (isStatsFetching || !stats) {
    return (
      <div className='min-h-[35vh] flex items-center justify-center'>
        <Spinner />
      </div>
    );
  }

  const chartOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
    },
  };

  const chartData = {
    labels: stats.map(item => item.month),
    datasets: [
      {
        label: 'Workers by month',
        data: stats.map(item => item.numberOfWorkers),
        backgroundColor: 'rgb(8, 61, 119)',
      },
    ],
  };

  return (
    <section className='max-h-[45vh] mb-20'>
      <SectionHeader>Total workers by month</SectionHeader>
      <Line options={chartOptions} data={chartData} />
    </section>
  );
}
