import {
  AllowNull,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  Default,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { TimecardStatus } from 'shared/timecard-status';
import { User } from '../../user/entities/user.entity';
import { Booking } from '../../booking/entities/booking.entity';

@Table({ updatedAt: false, deletedAt: false })
export class Timecard extends Model {
  @AllowNull(false)
  @CreatedAt
  @Column(DataType.DATEONLY)
  createdAt: Date;

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
}
