import { IsNotEmpty, IsString, IsArray, IsOptional } from 'class-validator';

class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsArray()
  @IsOptional()
  readonly members: number[];
}

export { CreateChatDto };
