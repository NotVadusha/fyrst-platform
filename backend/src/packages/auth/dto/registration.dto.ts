import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Matches,
  Validate,
  MinLength,
  MaxLength,
} from 'class-validator';
import { PasswordValidator } from '../helpers/password-validator';

export class RegistrationDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z\d!"#$%&'()*+,-.\/:;<=>?@\[\\\]^_\`{|}~]+$/g)
  @MinLength(8)
  @MaxLength(24)
  @Validate(PasswordValidator)
  password: string;
}
