import * as yup from 'yup';

export const chatSchema = yup
  .object()
  .shape({
    name: yup.string().max(20, 'Group name is too long').required(),
    member: yup
      .string()
      .email("Member's email should be a valid email")
      .required("Member's email is a required field"),
  })
  .required();
