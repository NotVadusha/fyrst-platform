import { AllowNull, Column, CreatedAt, DataType, Model, Table } from 'sequelize-typescript';
import { TimecardStatus } from './timecard-status';

@Table({ tableName: 'Timecard', updatedAt: false, deletedAt: false })
export class Timecard extends Model {
  @AllowNull(false)
  @Column(DataType.ENUM(...Object.values(TimecardStatus)))
  status: TimecardStatus;

  @AllowNull(false)
  @Column(DataType.FLOAT)
  amountToPay: number;

  @AllowNull(false)
  @CreatedAt
  @Column
  createdAt: Date;

  @Column
  approvedBy: number;

  @Column
  approvedAt: Date;

  @AllowNull(false)
  @Column
  bookingId: number;

  @AllowNull(false)
  @Column
  wokerdHours: number;
}
