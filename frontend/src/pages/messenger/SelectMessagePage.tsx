import React, { useState } from 'react';
import { NewConversationBlueButton } from './common/actions/common/NewConversationBlueButton';

export default function SelectMessagePage() {
  return (
    <div className='w-full lg:min-w-[500px]'>
      <div className='h-[320px] h-full py-2 flex flex-col items-left justify-center'>
        <h1 className='text-black text-xl'>Choose a message</h1>
        <h3 className='text-dark-grey'>
          Choose a message from the conversations or start a new one
        </h3>
        <NewConversationBlueButton className='w-fit self-left mt-4' />
      </div>
    </div>
  );
}
