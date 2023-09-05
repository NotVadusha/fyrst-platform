import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  BelongsToMany,
  HasOne,
} from 'sequelize-typescript';
import { Booking } from 'src/packages/booking/entities/booking.entity';
import { Roles } from 'src/packages/roles/entities/roles.entity';
import { Chat } from 'src/packages/chat/entities/chat.entity';
import { Permissions } from 'src/packages/permissions/entities/permissions.entity';
import { Facility } from 'src/packages/facility/entities/facility.entity';

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

  @Column({
    type: DataType.STRING,
    allowNull: true,
    defaultValue: null,
  })
  document_number: string;

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

  @BelongsToMany(() => Booking, 'user_bookings', 'user_id', 'booking_id')
  bookings: Booking[];

  @HasOne(() => Permissions)
  permissions: Permissions;

  @ForeignKey(() => Facility)
  @Column
  facility_id: number;
}

@Table
export class UserChat extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Chat)
  @Column
  chatId: number;

  @BelongsTo(() => Chat)
  chat: Chat;
}
