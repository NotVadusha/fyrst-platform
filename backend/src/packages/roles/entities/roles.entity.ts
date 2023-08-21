import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table
export class Roles extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.TEXT,
    unique: true,
  })
  label: string;
}
