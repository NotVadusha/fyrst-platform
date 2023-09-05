import * as yup from 'yup';

export const chatSchema = yup
  .object()
  .shape({
    name: yup.string().max(20, 'Group name is too long').required(),
    member: yup.number().required("Member's id is a required field"),
  })
  .required();
