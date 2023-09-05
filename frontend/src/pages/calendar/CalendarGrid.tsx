import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  getDay,
  startOfToday,
  startOfWeek,
  format,
  parse,
  add,
  isWithinInterval,
  isSameMonth,
} from 'date-fns';
import React, { useState } from 'react';
import { useGetAllEventsQuery } from 'src/common/store/api/packages/calendar/calendarApi';
import { CalendarCell } from './CalendarCell';
import { ReactComponent as ArrowRight } from '../../assets/icons/gray-arrow-right.svg';

const colStart = [
  'col-start-7',
  'col-start-1',
  'col-start-2',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
];

export const CalendarGrid = () => {
  const { data: events } = useGetAllEventsQuery(1);
  const today = startOfToday();
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMMM, yyyy'));
  const firstDayOfCurrentMonth = parse(currentMonth, 'MMMM, yyyy', new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayOfCurrentMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayOfCurrentMonth), { weekStartsOn: 1 }),
  });

  const prevMonth = () => {
    const firstDayPrevMonth = add(firstDayOfCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPrevMonth, 'MMMM, yyyy'));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayOfCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMMM, yyyy'));
  };
  return (
    <div className='max-w-[955px] mx-auto'>
      <div className='mb-8 flex gap-2 items-center '>
        <button onClick={prevMonth}>
          <ArrowRight className='rotate-[180deg]' />
        </button>
        <p className='text-h6 text-dark-grey'>{currentMonth}</p>
        <button onClick={nextMonth}>
          <ArrowRight />
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
      <div className='grid grid-cols-7 bg-[#686565]/[0.15]  gap-[1px] p-[1px] h-[620px]'>
        {days.map((day, i) => {
          if (!events) return;
          const eventForDate = events.filter(event => {
            if (!event.booking) return;
            return isWithinInterval(day, {
              start: new Date(event.booking.startDate),
              end: new Date(event.booking.endDate),
            });
          });
          return (
            <div key={day.toString()} className={i === 0 ? colStart[getDay(day)] : ''}>
              <CalendarCell
                date={day}
                events={eventForDate}
                isSameMonth={isSameMonth(firstDayOfCurrentMonth, day)}
              ></CalendarCell>
            </div>
          );
        })}
      </div>
    </div>
  );
};
