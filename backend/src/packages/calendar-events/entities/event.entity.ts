import { Table, Model, Column, PrimaryKey, AutoIncrement, ForeignKey } from 'sequelize-typescript';

import { User } from 'src/packages/user/entities/user.entity';

@Table({ tableName: 'Event', createdAt: false, updatedAt: false, deletedAt: false })
export class Event extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  description: string;

  @Column
  startDate: Date;

  @Column
  endDate: Date;

  @ForeignKey(() => User)
  @Column
  user_id: number;
}
