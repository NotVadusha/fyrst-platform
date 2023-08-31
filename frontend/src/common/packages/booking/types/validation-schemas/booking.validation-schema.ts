import * as y from 'yup';

export const bookingSchema = y.object().shape({
  status: y.string().required(),
  numberOfPositions: y.number().min(1).integer().required(),
  facilitiesRate: y.number().min(1).integer().required(),
  createdBy: y.number().min(1).integer().required(),
  sex: y.string().oneOf(['Male', 'Female']).required(),
  age: y.number().min(16).integer().required(),
  education: y.string().required(),
  positionsAvailable: y
    .number()
    .min(1, 'Must be more than 0')
    .integer('Must be whole number ')
    .required('Position available is a required field')
    .typeError('Must be a number'),
  workingHours: y.number().min(1).integer().required(),
  pricePerHour: y
    .number()
    .required('Price per hour  is a required field')
    .test('validAmount', 'Must be a valid amount', value => /^\d*.?\d{0,2}$/.test(String(value)))
    .typeError('Must be a number'),
  notes: y.string().required('Job description is a required field'),
  facilityId: y.number().min(1).integer().required(),
  startDate: y
    .date()
    .required('Start date is a required field')
    .test('start-before-end', 'Start date must be before end date', function (startDate) {
      const endDate = this.parent.endDate;
      return new Date(startDate) < new Date(endDate);
    })
    .test('start-after-today', 'Start date must be after or today', function (startDate) {
      return startDate.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
    }),
  endDate: y
    .date()
    .required('End date is a required field')
    .test('start-before-end', 'End date must be after start date', function (endDate) {
      const startDate = this.parent.startDate;
      return new Date(startDate) < new Date(endDate);
    }),
  employersName: y.string().min(2).max(50).required(`Employer's name is a required field`),
});
