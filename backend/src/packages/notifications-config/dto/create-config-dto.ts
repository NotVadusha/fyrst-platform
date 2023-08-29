import { IsBoolean, IsNotEmpty, Min, IsInt, IsOptional } from 'class-validator';

class CreateNotificationsConfigDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly userId: number;
}

export { CreateNotificationsConfigDto };
