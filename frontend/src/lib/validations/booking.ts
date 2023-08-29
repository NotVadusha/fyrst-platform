import * as y from 'yup';

export const bookingSchema = y
  .object()
  .shape({
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
    startDate: y.string().required('Start date date is a required field'),
    endDate: y.string().required('End date date is a required field'),
  })
  .required();
