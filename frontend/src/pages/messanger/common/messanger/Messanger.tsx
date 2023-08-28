import React from 'react';
import { Conversations } from '../conversation/Conversations';
import { Outlet } from 'react-router-dom';

const Messanger: React.FC = () => {
  return (
    <>
      <div className='flex justify-center mt-8 max-w-[1100px] ml-8'>
        <div className='w-full h-full bg-white shadow-md rounded-2xl'>
          <div className='flex gap-4 p-6'>
              <Conversations />
              <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};
export { Messanger };
