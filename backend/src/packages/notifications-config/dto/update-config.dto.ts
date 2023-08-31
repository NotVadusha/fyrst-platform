import { IsBoolean, IsNotEmpty, Min, IsInt, IsOptional } from 'class-validator';

class UpdateNotificationsConfigDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly userId: number;

  @IsOptional()
  @IsBoolean()
  readonly timecards?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly bookings?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly paymentSuccess?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly weeklyReport?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly moneySent?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly passwordChange?: boolean;
}

export { UpdateNotificationsConfigDto };
