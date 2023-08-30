import { IsNotEmpty, Min, IsInt } from 'class-validator';

class CreateNotificationsConfigDto {
  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly userId: number;
}

export { CreateNotificationsConfigDto };
