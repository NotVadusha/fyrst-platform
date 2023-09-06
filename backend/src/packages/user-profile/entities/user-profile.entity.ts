import { DATE } from 'sequelize';
import { Sequelize } from 'sequelize';
import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
  AllowNull,
} from 'sequelize-typescript';
import { User } from 'src/packages/user/entities/user.entity';

@Table({ tableName: 'User-profile', timestamps: false })
export class UserProfile extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    unique: true,
  })
  user_id: number;

  @Column({
    type: DataType.ARRAY(DataType.TEXT),
  })
  languages: string[];

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  description: string;

  @Column({
    type: DataType.TEXT,
  })
  education: string;

  @Column({
    type: DataType.TEXT,
  })
  sex: string;

  @Column({
    type: DataType.TEXT,
  })
  avatar: string;

  @AllowNull
  @Column
  stripeAccountId: string;
}
