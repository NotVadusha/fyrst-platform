import React from 'react';

export function TotalPayments() {
  const stats = {
    total: 14252,
    average: 27,
  };

  return (
    <section className='max-h-[35vh]'>
      <h2 className='text-h2 font-bold'>Total payments</h2>
      <p className='text-h5 font-semibold'>
        During the last month, your company has paid {stats.total}$ to your worker on Fyrst! That
        results in an average of {stats.average}$/hour paid to your wokers.
      </p>
    </section>
  );
}
