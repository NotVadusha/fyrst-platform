import {
  Column,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { User } from 'src/packages/user/entities/user.entity';
import { Message } from 'src/packages/message/entities/message.entity';

@Table
class Chat extends Model<InferAttributes<Chat>, InferCreationAttributes<Chat>> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column
  name: string;

  @Column
  @ForeignKey(() => User)
  userId: number;

  @BelongsTo(() => User, 'userId')
  user: User;

  @HasMany(() => Message)
  messages: Message[]; // ??? Do i need that?
}

export { Chat };
