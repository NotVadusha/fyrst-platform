import * as yup from 'yup';

export const invitationSchema = yup.object().shape({
  date: yup
    .date()
    .required('Date is a required field')
    .test('start-after-today', 'Date should not be before or today', function (date) {
      return date.setHours(0, 0, 0, 0) >= new Date().setHours(0, 0, 0, 0);
    }),
  time: yup.string().required('Time is a required field'),
});
