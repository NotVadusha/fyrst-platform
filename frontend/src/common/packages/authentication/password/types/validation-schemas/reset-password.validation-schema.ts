import * as yup from 'yup';

export const resetPasswordSchema = yup
  .object()
  .shape({
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
        'Password must contain at least one special character',
        value => {
          const specialChars = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
          for (const char of specialChars) {
            if (value?.includes(char)) return true;
          }
          return false;
        },
      )
      .required('Password is a required field'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required('Confirm password is a required field'),
  })
  .required();
