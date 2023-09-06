import * as y from 'yup';

export const updatePasswordSchema = y.object().shape({
  currentPassword: y.string().required('Current password is required'),
  newPassword: y
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(24, 'Password can be a total of 24 characters')
    .matches(
      /^[a-zA-Z\d!"#$%&'()*+,-.\/:;<=>?@\[\\\]^_\`{|}~]+$/g,
      'Password can only contain Latin letters and special characters',
    )
    .test('contains-spec-chars', 'Password must contain at least one special character', value => {
      const specialChars = '!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
      for (const char of specialChars) {
        if (value?.includes(char)) return true;
      }
      return false;
    })
    .required('Passoword is a required field'),
  confirmNewPassword: y
    .string()
    .oneOf([y.ref('newPassword')], 'Passwords must match')
    .required('Password confirmation is required'),
});
