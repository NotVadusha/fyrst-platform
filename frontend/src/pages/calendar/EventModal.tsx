import React from 'react';
import { Event } from 'src/common/packages/event/types/models/Event.model';
import { ReactComponent as Close } from '../../assets/icons/gray-x.svg';

interface EventModalProps {
  event: Event;

  setOpenModal: () => void;
}

export const EventModal = ({ event, setOpenModal }: EventModalProps) => {
  return (
    <div className='absolute z-50 top-[40%] left-0 bottom-0 right-0 flex  justify-center'>
      <div className='bg-white shadow-lg h-fit rounded-lg '>
        <div className='flex justify-between w-full px-8 py-6 border-b-[1px] border-[#686565]/[0.15] gap-10'>
          <h1 className='text-h6 text-blue'>{event.name}</h1>
          <button onClick={setOpenModal}>
            <Close className='h-4 w-4'></Close>
          </button>
        </div>
        <div className='px-8 py-6'>
          <p className='text-start text-body-default'>{event.description}</p>
        </div>
      </div>
    </div>
  );
};
