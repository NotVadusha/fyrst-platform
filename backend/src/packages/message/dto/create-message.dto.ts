import { IsInt, IsNotEmpty, IsOptional, IsString, Min, IsArray, Matches } from 'class-validator';

class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  readonly messageContent: string;

  @IsNotEmpty()
  @IsString()
  @Matches(/^(1[0-2]|0?[1-9]):([0-5]?[0-9]):?([0-5]?[0-9])$/)
  readonly time: string;

  @IsNotEmpty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  readonly attachments?: string[]; //TODO: refactor it in 'sharing files functionality' task

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  readonly chatId: number;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly userId: number;
}

export { CreateMessageDto };
