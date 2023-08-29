import { IsBoolean, IsNotEmpty, Min, IsInt, IsOptional } from 'class-validator';

class UpdateNotificationsConfigDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly userId: number;

  @IsOptional()
  @IsBoolean()
  readonly timecard?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly bookings?: false;

  @IsOptional()
  @IsBoolean()
  readonly paymentSuccess?: false;

  @IsOptional()
  @IsBoolean()
  readonly weeklyReport?: false;

  @IsOptional()
  @IsBoolean()
  readonly moneySent?: false;
}

export { UpdateNotificationsConfigDto };
