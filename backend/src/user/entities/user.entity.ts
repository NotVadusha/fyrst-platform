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
    type: DataType.Text,
  })
  first_name: Text;

  @Column({
    type: DataType.Text,
  })
  last_name: number;

  @Column({
    type: DataType.Text,
    unique: true,
  })
  email: number;

  @Column({
    type: DataType.Text,
    allowNull: true,
  })
  phone_number: number;

  @Column({
    type: DataType.Text,
  })
  city: number;

  @Column({
    type: DataType.DATE,
  })
  birthdate: Date;

  @Column({
    type: DataType.Text,
  })
  password: number;

  @Column({
    type: DataType.BOOLEAN,
  })
  is_confirmed: boolean;
}
