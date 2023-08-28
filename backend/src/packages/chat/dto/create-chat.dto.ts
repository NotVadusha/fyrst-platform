import { IsNotEmpty, IsString, IsInt, Min } from 'class-validator';

class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly userId: number;
}

export { CreateChatDto };
