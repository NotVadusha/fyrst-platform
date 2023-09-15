import React from 'react';
import { WeekWrapper } from './WeekWraper';
import { isSameDay, isSameMonth, isWithinInterval } from 'date-fns';

import { Event } from 'src/common/packages/event/types/models/Event.model';
import { Droppable } from 'react-beautiful-dnd';
import { CalendarEvent } from './CalendarEvent';

interface CalendarRowProps {
  week: Date[];
  events?: Event[];
  setEvent: (event: Event) => void;
  firstDayMonth: Date;
}

export const CalendarRow = ({ week, events, setEvent, firstDayMonth }: CalendarRowProps) => {
  const isCurrentDate = (day: Date) => {
    return isSameDay(day, new Date());
  };

  const sameMonth = (day: Date) => {
    return isSameMonth(firstDayMonth, day);
  };

  return (
    <div className='relative flex flex-1 border-b border-b-grey'>
      <WeekWrapper />
      <div className='absolute top-0 bottom-0 left-0 right-0 flex '>
        {week.map((day, i) => (
          <div key={i} className='bg-transparent leading-8 flex-1 flex justify-center'>
            <h2
              className={`block text-center whitespace-nowrap w-max min-w-[24px] h-6 leading-4
              ${isCurrentDate(day) ? 'bg-green rounded-[50%] w-6 text-white pt-1 mt-1' : 'mt-2 '}
              ${!sameMonth(day) ? 'text-grey' : ''}`}
            >
              {day.getDate()}
            </h2>
          </div>
        ))}
      </div>
      {events &&
        week.map((day, i) => {
          const weekStart = new Date(week[0]);
          const weekEnd = new Date(week[week.length - 1]);
          const eventsForDate = events
            .map(event => {
              const eventStartDate = new Date(event.startDate);
              const eventEndDate = new Date(event.endDate);

              if (isWithinInterval(eventStartDate, { start: weekStart, end: weekEnd })) {
                if (!isWithinInterval(eventEndDate, { start: weekStart, end: weekEnd })) {
                  eventEndDate.setTime(weekEnd.getTime());
                }

                if (eventStartDate.toDateString() === day.toDateString()) {
                  const modifiedEvent: Event = { ...event, endDate: eventEndDate };
                  return modifiedEvent;
                }
              } else if (isWithinInterval(eventEndDate, { start: weekStart, end: weekEnd })) {
                eventStartDate.setTime(weekStart.getTime());

                const modifiedEvent: Event = { ...event, startDate: eventStartDate };
                return modifiedEvent;
              } else if (
                isWithinInterval(weekStart, { start: eventStartDate, end: eventEndDate }) &&
                isWithinInterval(weekEnd, { start: eventStartDate, end: eventEndDate })
              ) {
                const modifiedEvent: Event = { ...event, startDate: weekStart, endDate: weekEnd };
                return modifiedEvent;
              }
              return null;
            })
            .filter(event => event !== null) as Event[];
          return (
            <Droppable key={i} droppableId={day.toISOString()}>
              {provided => (
                <div
                  className='h-[90px] mt-8 flex-1 z-10'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {eventsForDate.map((event, i) => {
                    return (
                      <button key={i} onClick={() => setEvent(event)}>
                        <CalendarEvent event={event} week={week} index={i}></CalendarEvent>
                      </button>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          );
        })}
    </div>
  );
};
