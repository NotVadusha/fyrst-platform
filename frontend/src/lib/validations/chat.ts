import * as yup from 'yup';

export const chatSchema = yup.object().shape({
  member: yup.string().email("Member's email must be a valid email").required("Member's email is a required field"),
});
