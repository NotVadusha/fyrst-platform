import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  Default,
  Model,
  Table,
} from 'sequelize-typescript';
import { TimecardStatus } from './timecard-status';

@Table({ tableName: 'Timecard', updatedAt: false, deletedAt: false })
export class Timecard extends Model {
  @AllowNull(false)
  @CreatedAt
  @Column
  createdAt: Date;

  @AllowNull(false)
  @Column
  createdBy: number;

  @AllowNull(false)
  @Column
  bookingId: number;

  @Column
  approvedBy: number;

  @Column
  approvedAt: Date;

  @AllowNull(false)
  @Default(TimecardStatus.Pending)
  @Column(DataType.ENUM(...Object.values(TimecardStatus)))
  status: TimecardStatus;
}
