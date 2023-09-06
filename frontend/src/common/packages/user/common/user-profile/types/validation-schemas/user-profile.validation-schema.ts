import * as y from 'yup';
import { intervalToDuration } from 'date-fns';

const phoneNumberRegex = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

export const profileSchema = y.object().shape({
  first_name: y
    .string()
    .required('First name is required field')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid first name'),
  last_name: y
    .string()
    .required('Second name is required field')
    .matches(/^[A-Za-z ]*$/, 'Please enter valid last name'),
  email: y.string().email('Invalid email input').required('Email is required field'),
  phone_number: y.lazy(value =>
    value
      ? y
          .string()
          .required()
          .test(
            'IsValidPhone',
            'Phone number is invalid',
            value => value.length > 6 && phoneNumberRegex.test(value) && value[0] != '0',
          )
      : y.string().optional().nullable(),
  ),
  city: y.lazy(value =>
    value
      ? y
          .string()
          .required()
          .test('IsValidCityName', 'City name is too short', value => value.length > 2)
      : y.string().optional().nullable(),
  ),
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
  document_number: y.string().optional().nullable(),
});
