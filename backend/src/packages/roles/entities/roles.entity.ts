import {
  Column,
  Model,
  Table,
  DataType,
  HasMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from 'src/packages/user/entities/user.entity';

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
    type: DataType.TEXT,
    unique: true,
  })
  label: string;
}
