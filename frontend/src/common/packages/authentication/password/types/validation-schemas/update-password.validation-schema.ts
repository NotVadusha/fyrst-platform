import * as y from 'yup';

export const updatePasswordSchema = y.object().shape({
  currentPassword: y.string().required('Current password is required'),
  newPassword: y
    .string()
    .required('Password is required')
    .notOneOf([y.ref('currentPassword')], "New password can't be the same as current password")
    .matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+).{8,24}$/, {
      message:
        'Password must contain 8-24 characters, at least one uppercase, and at least one special character.',
      excludeEmptyString: true,
    }),
  confirmNewPassword: y
    .string()
    .oneOf([y.ref('newPassword')], 'Passwords must match')
    .required('Password confirmation is required'),
});
