import {
  Column,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import { InferAttributes, InferCreationAttributes } from 'sequelize/types';
import { User, UserChat } from 'src/packages/user/entities/user.entity';
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
  ownerId: number;

  @BelongsTo(() => User, 'ownerId')
  user: User;

  @HasMany(() => Message)
  messages: Message[];

  @BelongsToMany(() => User, () => UserChat)
  members: User[];
}

export { Chat };
