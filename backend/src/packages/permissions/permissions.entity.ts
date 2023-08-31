import { AllowNull, Column, Default, ForeignKey, Model, Table } from 'sequelize-typescript';
import { User } from 'src/packages/user/entities/user.entity';

@Table({ timestamps: false })
export class Permissions extends Model {
  @AllowNull(false)
  @ForeignKey(() => User)
  @Column
  userId: number;

  @Default(false)
  @Column
  canManageTimecards: boolean;

  @Default(false)
  @Column
  canManageBookings: boolean;

  @Default(false)
  @Column
  canManageUsers: boolean;
}
