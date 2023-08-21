import { Inject } from '@nestjs/common';
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  HasOne,
  BelongsTo,
  BelongsToMany,
} from 'sequelize-typescript';
import { Roles } from 'src/packages/roles/entities/roles.entity';

@Table({ tableName: 'Users' })
export class User extends Model {
  @Inject(Roles)
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
  })
  city: string;

  @Column({
    type: DataType.DATEONLY,
  })
  birthdate: Date;

  @Column({
    type: DataType.TEXT,
  })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_confirmed: boolean;

  @ForeignKey(() => Roles)
  @Column({ field: 'id' })
  role_id: number;
}
