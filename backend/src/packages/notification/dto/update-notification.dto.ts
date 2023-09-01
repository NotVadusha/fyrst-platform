import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateNotificationDto {
  @IsNotEmpty()
  readonly id: number;

  @IsNotEmpty()
  readonly recipientId: number;

  @IsOptional()
  readonly isRead: boolean;
}
