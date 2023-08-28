import { IsInt, IsNotEmpty, IsOptional, IsString, Min, IsArray, Matches } from 'class-validator';

class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  readonly messageContent: string;

  @IsNotEmpty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly attachments?: string[]; //TODO: refactor it in 'sharing files functionality' task
}

export { CreateMessageDto };
