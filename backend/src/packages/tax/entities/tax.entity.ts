import {
  Column,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { Payment } from '../../payment/entities/payment.entity';

@Table({ timestamps: true })
class Tax extends Model<InferAttributes<Tax>, InferCreationAttributes<Tax>> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  percentage: number;

  @AllowNull
  @Column({
    type: DataType.DOUBLE(10, 2),
  })
  additionalAmount: number;

  @Column
  @ForeignKey(() => Payment)
  paymentId: number;

  @BelongsTo(() => Payment, 'paymentId')
  payment: Payment;
}

export { Tax };
