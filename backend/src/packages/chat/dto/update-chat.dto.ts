import { CreateChatDto } from './create-chat.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateChatDto extends PartialType(CreateChatDto) {}
