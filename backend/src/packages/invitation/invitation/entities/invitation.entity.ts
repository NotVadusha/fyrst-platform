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
  Default,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { Chat } from 'src/packages/chat/entities/chat.entity';
import { User } from 'src/packages/user/entities/user.entity';
import { InvitationStatus } from 'shared/invitation-status';

@Table({ timestamps: true })
class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @Column
  @ForeignKey(() => User)
  organizerId: number;

  @BelongsTo(() => User, 'organizerId')
  organizer: User;

  @Column(DataType.DATEONLY)
  date: Date;

  @Default(InvitationStatus.Pending)
  @Column(DataType.ENUM(...Object.values(InvitationStatus)))
  status: InvitationStatus;
}

export { Message };
