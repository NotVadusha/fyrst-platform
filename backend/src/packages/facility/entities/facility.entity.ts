import {
  AllowNull,
  AutoIncrement,
  Column,
  PrimaryKey,
  Table,
  Model,
  DataType,
} from 'sequelize-typescript';

@Table({ tableName: 'Facility', updatedAt: false, deletedAt: false })
export class Facility extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column(DataType.TEXT)
  logo: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  name: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  city: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  address: string;

  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;
}
