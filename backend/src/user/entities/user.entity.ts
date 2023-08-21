import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
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
}
