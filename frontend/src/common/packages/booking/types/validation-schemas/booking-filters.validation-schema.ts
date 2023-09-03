import * as yup from 'yup';

export const bookingFiltersSchema = yup.object({
  facility: yup.string(),
  endDate: yup.date(),
  startDate: yup.date(),
  status: yup.string().oneOf(['pending', 'accepted', 'rejected', 'canceled', 'completed']),
});
