import React from 'react';
import { Conversations } from '../conversation/Conversations';
import { Outlet } from 'react-router-dom';

const Messanger: React.FC = () => {
  return (
    <>
      <div className='flex justify-center mt-8 max-w-[1100px] md:mx-8'>
        <div className='w-full h-full bg-white shadow-md rounded-2xl'>
          <div className='flex flex-col xl:flex-row gap-2 xl:gap-4 p-6'>
            <Conversations />
            <hr className='border-b border-grey' />
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export { Messanger };
