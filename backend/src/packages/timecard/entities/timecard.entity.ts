import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Index,
  Model,
  Table,
  HasOne,
} from 'sequelize-typescript';
import { TimecardStatus } from 'shared/timecard-status';
import { User } from '../../user/entities/user.entity';
import { Booking } from '../../booking/entities/booking.entity';
import { Payment } from 'src/packages/payment/entities/payment.entity';

@Table({ updatedAt: false, deletedAt: false })
export class Timecard extends Model {
  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATEONLY)
  createdAt: Date;

  @Index
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  createdBy: number;

  @BelongsTo(() => User, { foreignKey: 'createdBy' })
  employee: User;

  @AllowNull(false)
  @ForeignKey(() => Booking)
  @Column
  bookingId: number;

  @BelongsTo(() => Booking)
  booking: Booking;

  @ForeignKey(() => User)
  @Column
  approvedBy: number;

  @BelongsTo(() => User, { foreignKey: 'approvedBy' })
  facilityManager: User | null;

  @Column(DataType.DATEONLY)
  approvedAt: Date;

  @AllowNull(false)
  @Default(TimecardStatus.Pending)
  @Column(DataType.ENUM(...Object.values(TimecardStatus)))
  status: TimecardStatus;

  @AllowNull(false)
  @Column
  hoursWorked: number;

  @AllowNull(false)
  @Column
  lunchHours: number;

  @HasOne(() => Payment)
  payment: Payment;
}
