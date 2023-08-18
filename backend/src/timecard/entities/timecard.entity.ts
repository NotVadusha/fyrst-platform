import { AllowNull, Column, CreatedAt, Model, Table } from 'sequelize-typescript';

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
}
