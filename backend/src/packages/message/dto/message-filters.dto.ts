import { IsString } from 'class-validator';

export class MessageFiltersDto {
  @IsString()
  messageContent: string;
}
