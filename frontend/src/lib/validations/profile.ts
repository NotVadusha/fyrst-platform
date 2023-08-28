import * as y from 'yup';
import { intervalToDuration } from 'date-fns';

export const profileSchema = y
  .object()
  .shape({
    firstName: y.string().required('First name is required field'),
    secondName: y.string().required('Second name is required field'),
    email: y.string().email('Invalid email input').required('Email is required field'),
    phoneNumber: y.string().min(3).required('Phone number is a required field'),
    city: y.string().min(2).max(58).required('City is required field'),
    dateOfBirth: y
      .string()
      .required('Birthdate is required field')
      .test('IsAdult', `You're too young`, (value: string) => {
        const { years } = intervalToDuration({
          start: new Date(value),
          end: new Date(),
        });
        if (years) return years >= 16;
        return false;
      }),
  })
  .required();
