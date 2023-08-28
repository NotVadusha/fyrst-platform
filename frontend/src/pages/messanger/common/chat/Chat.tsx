import React from 'react';
import { Messages } from '../messages/Messages';
import { Conversation } from '../conversation/Conversation';

const Chat: React.FC = () => {
  return (
    <>
      <div className='flex justify-center mt-8'>
        <div className='w-full h-full bg-white shadow-md rounded-2xl'>
          <div className='grid grid-flow-col gap-2 py-8 px-6'>
            <div className='mr-8'>
              <Messages />
            </div>
            <div>
              <Conversation />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export { Chat };
