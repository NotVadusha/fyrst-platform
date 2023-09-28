import React from 'react';

export const WeekWrapper = () => {
  return (
    <div className='absolute top-0 bottom-0 left-0 right-0 flex'>
      {Array.from({ length: 7 }, (_, i) => (
        <div key={i} className='border-r-grey border-r flex-1'></div>
      ))}
    </div>
  );
};
