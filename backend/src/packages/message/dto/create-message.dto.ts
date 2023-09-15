import { IsInt, IsNotEmpty, IsOptional, IsString, Min, IsArray, Matches } from 'class-validator';

class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  readonly messageContent: string;

  @IsString()
  @IsOptional()
  readonly attachment?: string;
}

export { CreateMessageDto };
