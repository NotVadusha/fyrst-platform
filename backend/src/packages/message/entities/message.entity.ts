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
import { Chat } from 'src/packages/chat/entities/chat.entity';
import { User } from 'src/packages/user/entities/user.entity';

@Table({ timestamps: true })
class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    type: DataType.TEXT,
  })
  messageContent: string;

  @AllowNull
  @Column({
    type: DataType.TEXT,
  })
  attachment: string;

  @Column
  @ForeignKey(() => Chat)
  chatId: number;

  @BelongsTo(() => Chat, 'chatId')
  chat: Chat;

  @Column
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;
}

export { Message };
