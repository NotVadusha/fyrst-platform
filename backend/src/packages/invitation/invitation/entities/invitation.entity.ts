import {
  Column,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
  Default,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { User } from 'src/packages/user/entities/user.entity';
import { InvitationStatus } from 'shared/invitation-status';
import { Booking } from 'src/packages/booking/entities/booking.entity';

@Table({ timestamps: true })
class Invitation extends Model<InferAttributes<Invitation>, InferCreationAttributes<Invitation>> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  employeeId: number;

  @BelongsTo(() => User, 'employeeId')
  employee: User;

  @Column
  @ForeignKey(() => User)
  organizerId: number;

  @BelongsTo(() => User, 'organizerId')
  organizer: User;

  @Column
  @ForeignKey(() => Booking)
  bookingId: number;

  @BelongsTo(() => Booking, 'bookingId')
  booking: Booking;

  @Column(DataType.DATEONLY)
  date: Date;

  @Column(DataType.STRING)
  time: string;

  @Default('')
  @Column(DataType.STRING)
  meetingId: string;

  @Default(InvitationStatus.Pending)
  @Column(DataType.ENUM(...Object.values(InvitationStatus)))
  status: InvitationStatus;
}

export { Invitation };
