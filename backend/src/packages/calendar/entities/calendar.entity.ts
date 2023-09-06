import {
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/packages/user/entities/user.entity';
import { Event } from '../../calendar-events/entities/event.entity';
@Table({ tableName: 'Calendar', updatedAt: false, createdAt: false, deletedAt: false })
export class Calendar extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Event)
  events: Event[];
}
