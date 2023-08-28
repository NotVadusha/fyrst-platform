import { IsBoolean, IsNotEmpty, Min, IsInt } from 'class-validator';

class UpdateNotificationsConfigDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly userId: number;

  @IsNotEmpty()
  @IsBoolean()
  timecard: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly bookings: false;

  @IsNotEmpty()
  @IsBoolean()
  readonly paymentSuccess: false;

  @IsNotEmpty()
  @IsBoolean()
  readonly weeklyReport: false;

  @IsNotEmpty()
  @IsBoolean()
  readonly moneySent: false;
}

export { UpdateNotificationsConfigDto };
