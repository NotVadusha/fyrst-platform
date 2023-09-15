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
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { Timecard } from 'src/packages/timecard/entities/timecard.entity';
import { PaymentStatus } from 'shared/payment-status';

@Table({ timestamps: true })
class Invoice extends Model<InferAttributes<Invoice>, InferCreationAttributes<Invoice>> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    type: DataType.DOUBLE(20, 2),
  })
  amountPaid: number;

  @Column({
    type: DataType.ENUM(...Object.values(PaymentStatus)),
  })
  status: PaymentStatus;

  @AllowNull
  @Column
  path: string;

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
}

export { Invoice };
