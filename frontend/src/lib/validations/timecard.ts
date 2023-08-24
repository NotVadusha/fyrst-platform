import * as y from 'yup';

export const timecardSchema = y
  .object()
  .shape({
    type: y.string().min(3, 'Type must be at least 2 characters.').required(),
    employeeName: y.string().min(2, 'Name has to be at lets 2 characters long').required(),
    facility: y
      .string()
      .max(16, 'Facility has to be at most 16 characters long')
      .required('Facility is a required field'),
    managerName: y.string().required('Manager name is a required field'),
    hoursWorked: y
      .number()
      .test('is-number', 'Hours Worked field must be a number', value => typeof value === 'number')
      .required('Hours Worked is a required field'),
    lunchTaken: y.string().required('Lunch taken is a required field'),
  })
  .required();
