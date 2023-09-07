import { isSameDay } from 'date-fns';
import React, { useRef, useState } from 'react';
import { Event } from 'src/common/packages/event/types/models/Event.model';
import { EventModal } from './EventModal';

interface CalendarCellProps {
  date: Date;
  events?: Event[];
  isSameMonth: boolean;
}

export const CalendarCell = ({ date, events, isSameMonth }: CalendarCellProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const isCurrentDate = (date: Date) => {
    return isSameDay(new Date(), date);
  };

  return (
    <div className='flex flex-col items-center text-center p-1  gap-2 text-black bg-white min-h-[124px] h-full'>
      {date && (
        <p
          className={`${isCurrentDate(date) && 'bg-green rounded-[50%] w-6 text-white'} ${
            !isSameMonth && 'text-grey'
          }`}
        >
          {date.getDate()}
        </p>
      )}
      <section className='flex flex-col gap-1 w-full '>
        {events &&
          events.map(event => {
            return (
              <button
                onClick={() => setSelectedEvent(event)}
                className='bg-blue text-white text-body-small rounded-lg px-2 py-[1px]  truncate'
                key={event.name}
              >
                {event.name}
              </button>
            );
          })}
      </section>
      {selectedEvent && (
        <EventModal event={selectedEvent} date={date} setOpenModal={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};
