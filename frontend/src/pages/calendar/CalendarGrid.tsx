import React, { useState } from 'react';
import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  startOfToday,
  startOfWeek,
  format,
  parse,
  add,
  differenceInDays,
  addDays,
} from 'date-fns';

import { ReactComponent as ArrowRight } from '../../assets/icons/gray-arrow-right.svg'; // Import your arrow icon
import { useGetUserWithEventsQuery } from 'src/common/store/api/packages/user/userApi';
import { DragDropContext, DragUpdate } from 'react-beautiful-dnd';
import { useUpdateEventMutation } from 'src/common/store/api/packages/calendar/calendarApi';

import { CalendarRow } from './CalendarRow';
import { EventModal } from './EventModal';
import { Event } from 'src/common/packages/event/types/models/Event.model';

interface CalendarGridProps {
  userId: number;
}

export const CalendarGrid = ({ userId }: CalendarGridProps) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [editEvent] = useUpdateEventMutation();

  const { data } = useGetUserWithEventsQuery(userId || 1);

  const events = data?.events;

  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM, yyyy'));
  const firstDayOfCurrentMonth = parse(currentMonth, 'MMMM, yyyy', new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayOfCurrentMonth), { weekStartsOn: 1 }),
  });

  const weeks = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const prevMonth = () => {
    const firstDayPrevMonth = add(firstDayOfCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, 'MMMM, yyyy'));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayOfCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMMM, yyyy'));
  };

  const goToCurrentMonth = () => {
    setCurrentMonth(format(today, 'MMMM, yyyy'));
  };

  const dragEnd = async (value: DragUpdate) => {
    const startDate = value.destination?.droppableId;
    if (!startDate) return;
    if (!events) return;

    const eventId = Number(value.draggableId);

    const event = events.find(event => event.id === eventId);
    if (!event) return;

    const deference = differenceInDays(new Date(startDate), new Date(event.startDate));

    const endDate = addDays(new Date(event.endDate), deference);

    await editEvent({
      id: eventId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });
  };

  return (
    <div className='mx-4'>
      <div className='lg:w-[955px] mx-auto pb-11 md:w-full'>
        <div className='flex justify-between w-full items-center mb-8'>
          <div className='flex gap-2 items-center'>
            <button onClick={prevMonth}>
              <ArrowRight className='rotate-[180deg]' />
            </button>
            <p className='text-h6 text-dark-grey w-40 text-center'>{currentMonth}</p>
            <button onClick={nextMonth}>
              <ArrowRight />
            </button>
          </div>
          <button
            className='border border-[#686565]/[0.15] h-12 px-4 hover:bg-grey/[0.15] rounded-lg text-dark-grey'
            onClick={goToCurrentMonth}
          >
            Today
          </button>
        </div>
        <div className='grid grid-cols-7 text-center text-dark-grey text-body-small '>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
          <div>Sun</div>
        </div>
        <DragDropContext onDragEnd={dragEnd}>
          <div className='flex flex-col border-t-grey border-t border-l-grey border-l h-full'>
            {weeks.map((week, i) => (
              <CalendarRow
                firstDayMonth={firstDayOfCurrentMonth}
                events={events}
                week={week}
                key={i}
                setEvent={setSelectedEvent}
              ></CalendarRow>
            ))}
          </div>
        </DragDropContext>
        {selectedEvent && (
          <EventModal
            event={selectedEvent}
            setOpenModal={() => setSelectedEvent(null)}
          ></EventModal>
        )}
      </div>
    </div>
  );
};

export default CalendarGrid;
