import * as yup from 'yup';

export const userFiltersSchema = yup.object({
  name: yup.string(),
  email: yup.string().email(),
  phone: yup.string(),
  city: yup.string(),
  emailConfirmed: yup.boolean(),
  birthDate: yup.date(),
});
