import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ name: 'custom', async: false })
export class PasswordValidator implements ValidatorConstraintInterface {
  validate(value: string, args: ValidationArguments) {
    const specialChars = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
    for (const char of specialChars) {
      if (value?.includes(char)) return true;
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Password must contain at least one special character';
  }
}
