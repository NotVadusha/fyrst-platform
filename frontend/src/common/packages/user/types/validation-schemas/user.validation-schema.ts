import * as yup from 'yup';

const phoneRegex =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const userSchema = yup
  .object()
  .shape({
    first_name: yup
      .string()
      .max(20, 'First name is too long')
      .required('First name is a required field'),
    last_name: yup
      .string()
      .max(20, 'Last name is too long')
      .required('Last name is a required field'),
    email: yup.string().email('Email has to be valid').required('Email is a required field'),
    is_confirmed: yup.boolean().optional(),
    phone_number: yup
      .string()
      .matches(phoneRegex, { message: 'Phone number is not valid', excludeEmptyString: true })
      .optional(),
    city: yup.string().max(32).optional(),
    birthdate: yup.string().optional(),
    password: yup.string().max(20, 'Password is too long').optional(),
    role_id: yup.number().required('Role id is a required field'),
    permissions: yup
      .object()
      .shape({
        manageBookings: yup.boolean(),
        manageTimecards: yup.boolean(),
        manageUsers: yup.boolean(),
      })
      .when('role_id', {
        is: 2,
        then: schema =>
          schema.shape({
            manageBookings: yup.boolean().required(),
            manageTimecards: yup.boolean().required(),
            manageUsers: yup.boolean().required(),
          }),
      }),
  })
  .required();
