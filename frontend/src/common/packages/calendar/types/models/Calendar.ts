import { Event } from 'src/common/packages/event/types/models/Event.model';

export interface Calendar {
  id: number;
  userId: number;
  events: Event[];
}
