import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserService } from '../user.service';

@Injectable()
export class SaveValidation implements PipeTransform<any> {
  constructor(private readonly UserService: UserService) {}
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const user = plainToInstance(CreateUserDto, value);
    const errors = await validate(user);

    if (errors.length) {
      const messages = errors.map(error => {
        return `${error.property}: ${
          error.constraints && Object.values(error.constraints).join('. ')
        }`;
      });
      throw new BadRequestException(messages);
    }

    const users = await this.UserService.findAll();
    const sameMail = users.find(user => user.email === value.email);
    if (sameMail) {
      throw new ConflictException('This email is already in use');
    }

    return value;
  }
}
