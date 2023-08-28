import { IsNotEmpty, IsString, IsInt, Min, IsArray, IsOptional } from 'class-validator';

class CreateChatDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  readonly ownerId: number;

  @IsArray()
  @IsOptional()
  readonly memberIds: number[];
}

export { CreateChatDto };
