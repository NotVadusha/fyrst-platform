import {
  AutoIncrement,
  BelongsTo,
  Column,
  CreatedAt,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
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

  @ForeignKey(() => User)
  @Column
  recipientId: number;

  @BelongsTo(() => User, 'recipientId')
  recipient: User;
}
