import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Roles } from 'src/packages/roles/entities/roles.entity';
import { Chat } from 'src/packages/chat/entities/chat.entity';

@Table({ tableName: 'Users' })
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
  })
  first_name: string;

  @Column({
    type: DataType.TEXT,
  })
  last_name: string;

  @Column({
    type: DataType.TEXT,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  phone_number: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  city: string;

  @Column({
    type: DataType.DATEONLY,
    allowNull: true,
  })
  birthdate: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_confirmed: boolean;

  @BelongsTo(() => Roles)
  role: Roles;

  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id: number;

  @ForeignKey(() => Chat)
  @Column
  chatId: number;

  @BelongsToMany(() => Chat, () => UserChat)
  chats: Chat[];
}

@Table
export class UserChat extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Chat)
  @Column
  chatId: number;
}
