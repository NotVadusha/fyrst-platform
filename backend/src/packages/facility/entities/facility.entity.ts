import { Model } from 'sequelize';
import { AllowNull, AutoIncrement, Column, PrimaryKey, Table } from 'sequelize-typescript';

@Table({ tableName: 'Facility', updatedAt: false, deletedAt: false })
export class Facility extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @AllowNull(false)
  @Column
  logo: string;

  @AllowNull(false)
  @Column
  name: string;

  @AllowNull(false)
  @Column
  city: string;

  @AllowNull(false)
  @Column
  address: string;

  @AllowNull(false)
  @Column
  desctiptions: string;
}
