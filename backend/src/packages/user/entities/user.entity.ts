import { Column, Model, Table, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Roles } from 'src/packages/roles/entities/roles.entity';

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

  @BelongsTo(() => Roles)
  role: Roles;

  @ForeignKey(() => Roles)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  role_id: number;
}
