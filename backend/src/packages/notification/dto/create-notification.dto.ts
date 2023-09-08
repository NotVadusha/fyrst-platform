import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  @IsString()
  readonly content: string;

  @IsNotEmpty()
  @IsNumber()
  readonly recipientId: number;

  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @IsNotEmpty()
  @IsNumber()
  readonly refId: number;
}
