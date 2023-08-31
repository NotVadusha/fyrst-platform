import * as y from 'yup';
import { intervalToDuration } from 'date-fns';

export const profileSchema = y.object().shape({
  first_name: y.string().required('First name is required field'),
  last_name: y.string().required('Second name is required field'),
  email: y.string().email('Invalid email input').required('Email is required field'),
  phone_number: y.lazy(value =>
    value
      ? y
          .string()
          .required()
          .test('IsValidPhone', 'Phone number is too short', value => value.length > 6)
      : y.string().optional(),
  ),
  city: y.string().min(2).max(58),
  birthdate: y
    .string()
    .test('IsAdult', `You must be 16+ y.o.`, (value: string | undefined) => {
      if (value) {
        const { years } = intervalToDuration({
          start: new Date(value),
          end: new Date(),
        });
        if (years) return years >= 16;
      }
      return true;
    })
    .optional(),
});
