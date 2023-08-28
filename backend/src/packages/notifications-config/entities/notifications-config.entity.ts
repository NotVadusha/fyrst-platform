import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types/model';
import { User } from 'src/packages/user/entities/user.entity';

@Table({ tableName: 'notification_config', timestamps: true })
class NotificationConfig extends Model<
  InferAttributes<NotificationConfig>,
  InferCreationAttributes<NotificationConfig>
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, 'user_id')
  user: User;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  timecards: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  bookings: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  paymentSuccess: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  passwordChange: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  weeklyReport: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  moneySent: boolean;
}

export { NotificationConfig };
