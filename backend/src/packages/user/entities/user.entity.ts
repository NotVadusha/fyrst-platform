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
  })
  city: string;

  @Column({
    type: DataType.DATE,
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
}
