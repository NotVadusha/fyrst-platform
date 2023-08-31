import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  ForeignKey,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/packages/user/entities/user.entity';

@Table({ tableName: 'Notification', updatedAt: false, deletedAt: false })
export class Notification extends Model<
  InferAttributes<Notification>,
  InferCreationAttributes<Notification>
> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  content: string;

  @Column({ defaultValue: false })
  isRead: boolean;

  @ForeignKey(() => User)
  @Column
  recipientId: number;

  @BelongsTo(() => User, 'recipientId')
  recipient: User;
}
