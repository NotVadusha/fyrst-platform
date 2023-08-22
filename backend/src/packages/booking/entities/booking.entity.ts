import {
  Column,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
  DataType,
  CreatedAt,
  AllowNull,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { User } from 'src/packages/user/entities/user.entity';

@Table
class Booking extends Model<InferAttributes<Booking>, InferCreationAttributes<Booking>> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.ENUM('pending', 'accepted', 'rejected', 'canceled', 'completed'))
  status: string;

  @CreatedAt
  @Column
  createdAt: Date;

  @Column
  numberOfPositions: number;

  @Column(DataType.FLOAT)
  facilitiesRate: number;

  @Column
  @ForeignKey(() => User)
  createdBy: number;

  @BelongsTo(() => User, 'createdBy')
  creator: User;

  @Column
  sex: string;

  @Column
  age: number;

  @Column
  education: string;

  @Column
  positionsAvailable: number;

  @Column
  workingHours: number;

  @Column(DataType.FLOAT)
  pricePerHour: number;

  @AllowNull
  @Column
  notes: string;

  @Column
  facilityId: number; //mock
}

export { Booking };
