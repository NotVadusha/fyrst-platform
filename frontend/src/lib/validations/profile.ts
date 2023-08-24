import * as y from 'yup';

export const profileSchema = y
  .object()
  .shape({
    firstName: y.string().required('First name is required field'),
    secondName: y.string().required('Second name is required field'),
    email: y.string().email('Invalid email input').required('Email is required field'),
    phoneNumber: y.string().required('Phone number is a required field'),
    city: y.string().required('City is required field'),
    dateOfBirth: y.date().required('Birthdate is required field'),
  })
  .required();
