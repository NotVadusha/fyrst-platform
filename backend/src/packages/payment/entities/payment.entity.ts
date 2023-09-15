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
  Index,
  Default,
  HasMany,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { Timecard } from 'src/packages/timecard/entities/timecard.entity';
import { PaymentStatus } from 'shared/payment-status';
import { Tax } from 'src/packages/tax/entities/tax.entity';

@Table({ timestamps: true })
class Payment extends Model<InferAttributes<Payment>, InferCreationAttributes<Payment>> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull
  @Column
  stripePaymentId: string;

  @Column({
    type: DataType.DOUBLE(20, 2),
  })
  amountPaid: number;

  @Column({
    type: DataType.ENUM('Stripe'),
  })
  type: string;

  @Column
  instapay: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
  })
  status: PaymentStatus;

  @Column
  approved: boolean;

  @Column
  @ForeignKey(() => Timecard)
  timecardId: number;

  @BelongsTo(() => Timecard, 'timecardId')
  timecard: Timecard;

  @Index
  @AllowNull(false)
  @Default(new Date())
  @Column
  createdAt: Date;

  @HasMany(() => Tax)
  taxes: Tax[];
}

export { Payment };
