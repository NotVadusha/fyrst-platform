import {
  Table,
  Model,
  Column,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  DataType,
} from 'sequelize-typescript';

import { User } from 'src/packages/user/entities/user.entity';

export enum AssociatedModel {
  BOOKING = 'booking',
}

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

  @Column(DataType.DATE)
  startDate: Date;

  @Column(DataType.DATE)
  endDate: Date;

  @ForeignKey(() => User)
  @Column
  user_id: number;

  @Column(DataType.ENUM(...Object.values(AssociatedModel)))
  associatedType: AssociatedModel;

  @Column
  associatedId: number;
}
