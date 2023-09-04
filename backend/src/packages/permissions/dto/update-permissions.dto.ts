import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePermissionsDto {
  @IsOptional()
  @IsBoolean()
  manageTimecards?: boolean;

  @IsOptional()
  @IsBoolean()
  manageBookings?: boolean;

  @IsOptional()
  @IsBoolean()
  manageUsers?: boolean;
}
