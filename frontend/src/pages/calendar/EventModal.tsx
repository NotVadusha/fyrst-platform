import React from 'react';
import { Event } from 'src/common/packages/event/types/models/Event.model';
import { ReactComponent as Close } from '../../assets/icons/gray-x.svg';

interface EventModalProps {
  event: Event;
  date: Date;
  setOpenModal: (bool: boolean) => void;
}

export const EventModal = ({ event, date, setOpenModal }: EventModalProps) => {
  console.log(date);
  return (
    <div className='absolute z-[1000] top-0 left-0 bottom-0 right-0 flex mt-[200px] justify-center  overflow-hidden'>
      <div className='bg-white shadow-shad h-fit rounded-lg '>
        <div className='flex justify-between w-[400px] px-8 py-6 border-b-[1px] border-[#686565]/[0.15]'>
          <h1 className='text-h6 text-blue'>{event.name}</h1>
          <button onClick={() => setOpenModal(false)}>
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
