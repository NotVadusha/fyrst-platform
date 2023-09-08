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

import { CalendarCell } from './CalendarCell';
import { ReactComponent as ArrowRight } from '../../assets/icons/gray-arrow-right.svg';
import { useAppSelector } from 'src/common/hooks/redux';
import { selectUserId } from 'src/common/store/slices/packages/user/userSelectors';
import { useGetUserWithEventsQuery } from 'src/common/store/api/packages/user/userApi';

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
  const userId = useAppSelector(selectUserId);

  const { data } = useGetUserWithEventsQuery(userId || 1);
  const events = data?.events;

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

  const goToCurrentMonth = () => {
    setCurrentMonth(format(today, 'MMMM, yyyy'));
  };
  return (
    <div className='w-[955px] mx-auto pb-11'>
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
      <div className='grid grid-cols-7 bg-[#686565]/[0.15]  gap-[1px] p-[1px] h-full'>
        {days.map((day, i) => {
          if (!events) return;
          const eventForDate = events.filter(event => {
            return isWithinInterval(day, {
              start: new Date(event.startDate),
              end: new Date(event.endDate),
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
