import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function BookingStatistics() {
  const statistics = {
    total: 219,
    completed: 135,
    pending: 84,
  };

  const chartData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        label: '# of Votes',
        data: [statistics.completed, statistics.pending],
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
          <span className='underline'>{statistics.total}</span> bookings.{' '}
          <span className='underline'>{statistics.completed}</span> of them were completed and{' '}
          <span className='underline'>{statistics.pending}</span> of them are still pending.
        </p>
      </div>
      <div className='col-span-1 text-center'>
        <Pie data={chartData} options={chartOptions} />
        <span className='mt-2 inline-block text-grey'>Completed to pending ratio</span>
      </div>
    </section>
  );
}
