import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { NotificationType } from 'shared/packages/notification/types/notification';
import { User } from 'src/packages/user/entities/user.entity';

@Table({ updatedAt: false, deletedAt: false })
export class Notification extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @CreatedAt
  @Column
  createdAt: Date;

  @Column
  content: string;

  @Column({ defaultValue: false })
  isRead: boolean;

  @Column(DataType.ENUM(...Object.values(NotificationType)))
  type: NotificationType;

  @Column
  refId: number;

  @ForeignKey(() => User)
  @Column
  recipientId: number;

  @BelongsTo(() => User, 'recipientId')
  recipient: User;
}
