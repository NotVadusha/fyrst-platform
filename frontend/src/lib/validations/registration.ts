import * as yup from 'yup';

export const registrationSchema = yup
  .object()
  .shape({
    fullname: yup
      .string()
      .matches(
        /^[A-Z][a-z]+ [A-Z][a-z]+$/,
        'Incorrect format, write the full name in the correct format, e.g. Ivan Ivanov',
      )
      .required('Full name is a required field'),
    email: yup.string().email('Invalid email address').required('Email is a required field'),
    password: yup
      .string()
      .min(8, 'Password must be at least 8 characters')
      .max(24, 'Password can be a total of 24 characters')
      .matches(
        /^[a-zA-Z\d!"#$%&'()*+,-.\/:;<=>?@\[\\\]^_\`{|}~]+$/g,
        'Password can only contain Latin letters and special characters',
      )
      .test(
        'contains-spec-chars',
        'Password must contain at least one cpecial character',
        value => {
          const specialChars = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
          for (const char of specialChars) {
            if (value?.includes(char)) return true;
          }
          return false;
        },
      )
      .required('Passoword is a required field'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Confirm passoword is a required field'),
  })
  .required();
