import * as y from 'yup';

export const bookingSchema = y
  .object()
  .shape({
    employersName: y.string().min(2, 'Name has to be at lets 2 characters long').required(),
    facility: y
      .string()
      .max(36, 'Facility has to be at most 36 characters long')
      .required('Facility is a required field'),
    positionsAvailable: y.number().required('Postions Available is a required field'),
    payPerHour: y.number().required('Pay per hour is a required field'),
    startDate: y.string().required('Start date is a required field'),
    endDate: y.string().required('End date date is a required field'),
    notes: y.string().required('Notes date is a required field'),
  })
  .required();
