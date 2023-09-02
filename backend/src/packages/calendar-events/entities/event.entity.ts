import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Booking } from 'src/packages/booking/entities/booking.entity';
import { Calendar } from 'src/packages/calendar/entities/calendar.entity';

const eventTypes = ['Booking', 'Interview'];

@Table({ tableName: 'Events', createdAt: false, updatedAt: false, deletedAt: false })
export class Event extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.ENUM({ values: eventTypes }))
  eventType: string;

  @ForeignKey(() => Booking)
  @Column
  bookingId: number;

  @Column
  name: string;

  @Column
  description: string;

  @ForeignKey(() => Calendar)
  @Column
  calendarId: number;
}
