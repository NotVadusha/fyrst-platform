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
    .min(1, 'Should be more than 0')
    .integer('Should be whole number')
    .required('Position available is a required field')
    .typeError('Should be a number'),
  workingHours: y.number().min(1).integer().required(),
  pricePerHour: y
    .number()
    .min(1, 'Should be more than 0')
    .required('Price per hour is a required field')
    .test('validAmount', 'Should be a valid amount', value => /^\d*.?\d{0,2}$/.test(String(value)))
    .typeError('Should be a number'),
  notes: y.string().required(`Job description is required field`),
  facilityId: y.number().min(1).integer().required('Facility is a required field'),
  startDate: y
    .date()
    .required('Start date is a required field')
    .test('start-before-end', 'Start date should be before end date', function (startDate) {
      const endDate = this.parent.endDate;
      return new Date(startDate) < new Date(endDate);
    })
    .test('start-after-today', 'Start date should be after or today', function (startDate) {
      return startDate.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
    }),
  endDate: y
    .date()
    .required('End date is a required field')
    .test('start-before-end', 'End date should be after start date', function (endDate) {
      const startDate = this.parent.startDate;
      return new Date(startDate) < new Date(endDate);
    }),
  employersName: y
    .string()
    .matches(/^[A-Z][a-z ,.'-]*( [A-Z][a-z ,.'-]*)*$/, `Invalid employer's name`)
    .min(2, `Employer's name is too short`)
    .max(50, `Employer's name is too long`)
    .required(`Employer's name is a required field`),
});
