import { differenceInDays, isSameDay } from 'date-fns';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Event } from 'src/common/packages/event/types/models/Event.model';

interface EventProps {
  event: Event;
  week: Date[];
  index: number;
}

const eventSpan = [
  'w-[14.28%]',
  'w-[28.57%]',
  'w-[42.86%]',
  'w-[57.14%]',
  'w-[71.42%]',
  'w-[85.70%]',
  'w-[100%]',
];

const eventPos = [
  'left-0',
  'left-[14.28%]',
  'left-[28.57%]',
  'left-[42.86%]',
  'left-[57.14%]',
  'left-[71.42%]',
  'left-[85.70%]',
];

const verticalPos = ['top-[2em]', 'top-[4em]', 'top-[6em]'];

export const CalendarEvent = ({ event, week, index }: EventProps) => {
  const startDate = new Date(event.startDate);
  const endDate = new Date(event.endDate);
  const duration = differenceInDays(endDate, startDate);
  const weekPos = week.findIndex(day => isSameDay(startDate, day));

  return (
    <Draggable draggableId={String(event.id)} index={event.id}>
      {provided => (
        <div
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          ref={provided.innerRef}
          className={
            ' bg-blue text-white absolute overflow-hidden rounded-lg px-2 whitespace-nowrap flex  ' +
            eventSpan[duration] +
            ' ' +
            eventPos[weekPos] +
            ' ' +
            verticalPos[index]
          }
        >
          {event.name}
        </div>
      )}
    </Draggable>
  );
};
