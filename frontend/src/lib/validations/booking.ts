import * as y from 'yup';

export const bookingSchema = y
  .object()
  .shape({
    employersName: y.string().required('Employers name is a required field'),
    status: y.string().required(),
    numberOfPositions: y.number().required(),
    facilitiesRate: y.number().required(),
    createdBy: y.number().required(),
    sex: y.string().oneOf(['Male', 'Female']).required('Sex date is a required field'),
    age: y.number().required('Age is a required field'),
    education: y.string().required('Education date is a required field'),
    positionsAvailable: y.number().required('Postions Available is a required field'),
    workingHours: y.number().required('Working hours is a required field'),
    pricePerHour: y.number().required('Pay per hour is a required field'),
    notes: y.string().required('Notes date is a required field'),
    facilityId: y.number().required(),
    startDate: y
      .string()
      .required('Start date date is a required field')
      .test('start-before-end', 'Start date must be before end date', function (startDate) {
        const endDate = this.parent.endDate;
        return new Date(startDate) < new Date(endDate);
      }),
    endDate: y.string().required('End date date is a required field'),
  })
  .required();
