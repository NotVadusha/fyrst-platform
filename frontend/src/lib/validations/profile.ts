import * as y from 'yup';
import { intervalToDuration } from 'date-fns';

export const profileSchema = y
  .object()
  .shape({
    first_name: y.string().required('First name is required field'),
    last_name: y.string().required('Second name is required field'),
    email: y.string().email('Invalid email input').required('Email is required field'),
    phone_number: y.lazy(value => (value === '' ? y.string() : y.string().optional().min(5))),
    city: y.string().min(2).max(58).required('City is required field'),
    birthdate: y
      .string()
      .test(
        'IsAdult',
        `Birthdate is required field and you may be 16+ y.o.`,
        (value: string | undefined) => {
          if (value) {
            const { years } = intervalToDuration({
              start: new Date(value),
              end: new Date(),
            });
            if (years) return years >= 16;
          }
          return false;
        },
      )
      .required('Birthdate is required field'),
  })
  .required();
