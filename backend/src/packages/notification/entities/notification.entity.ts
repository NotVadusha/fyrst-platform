import {
  BelongsTo,
  CreatedAt,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { NotificationType } from 'shared/packages/notification/types/notification';
import { User } from 'src/packages/user/entities/user.entity';

@Table({ updatedAt: false, deletedAt: false })
export class Notification extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @CreatedAt
  @Column({ defaultValue: new Date() })
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
