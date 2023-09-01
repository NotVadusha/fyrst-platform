import { IsNotEmpty } from 'class-validator';

export class CreateNotificationDto {
  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  readonly recipientId: number;
}
