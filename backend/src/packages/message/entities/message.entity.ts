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

@Table
class Message extends Model<InferAttributes<Message>, InferCreationAttributes<Message>> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  messageContent: string;

  @Column({
    type: DataType.TIME,
  })
  time: string;

  @AllowNull
  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  attachments: string[];

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
