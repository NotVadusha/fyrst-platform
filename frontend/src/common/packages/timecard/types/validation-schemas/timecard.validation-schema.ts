import * as y from 'yup';

export const timecardSchema = y
  .object()
  .shape({
    employeeName: y.string().min(2, 'Name has to be at lets 2 characters long').required(),
    managerName: y.string().required('Manager name is a required field'),
    hoursWorked: y
      .number()
      .typeError('Hours worked must be an integer')
      .integer('Hours worked must be an integer')
      .required('Hours worked is a required field'),
    lunchHours: y
      .number()
      .typeError('Lunch hours must be an integer')
      .integer('Lunch hours must be an integer')
      .required('Lunch hours is a required field'),
  })
  .required();
