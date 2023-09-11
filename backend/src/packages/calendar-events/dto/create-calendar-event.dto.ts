import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { AssociatedModel } from '../entities/event.entity';

export class CreateCalendarEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @IsNumber()
  @IsNotEmpty()
  user_id: number;

  @IsEnum(AssociatedModel)
  associatedType?: AssociatedModel;

  @IsNumber()
  associatedId?: number;
}
