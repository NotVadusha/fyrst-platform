import React from 'react';
import { Conversations } from '../conversation/Conversations';
import { Outlet } from 'react-router-dom';

const Messanger: React.FC = () => {
  return (
    <>
      <div className='flex justify-center mt-8'>
        <div className='w-full h-full bg-white shadow-md rounded-2xl'>
          <div className='grid grid-flow-col gap-2 py-8 px-6'>
            <div className='mr-8'>
              <Conversations />
            </div>
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export { Messanger };
