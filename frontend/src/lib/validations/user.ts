import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export const userSchema = yup.object().shape({
  first_name: yup.string().max(20, 'First name is too long').required(),
  last_name: yup.string().max(20, 'Last name is too long').required(),
  email: yup.string().email('Email has to be valid').required(),
  phone_number: yup.string().max(11).optional(),
  city: yup.string().max(32).optional(),
  birthdate: yup.string(),
  password: yup.string().max(20, 'Password is too long').optional(),
  role_id: yup.number().required("Role id is a required field"),
}).required();
