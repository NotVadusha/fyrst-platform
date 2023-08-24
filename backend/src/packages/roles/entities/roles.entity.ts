import { Column, Model, Table, DataType } from 'sequelize-typescript';

@Table({ tableName: 'Roles', createdAt: false, updatedAt: false })
export class Roles extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column({
    type: DataType.ENUM('WORKER', 'FACILITY_ADMIN', 'AGENCY_ADMIN', 'SUPER_ADMIN'),
  })
  label: string;
}
