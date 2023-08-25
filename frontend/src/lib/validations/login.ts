import * as yup from 'yup';

export const loginSchema = yup
  .object()
  .shape({
    email: yup.string().email('Invalid email address').required('Email is a required field'),
    password: yup.string().required('Passoword is a required field'),
  })
  .required();
