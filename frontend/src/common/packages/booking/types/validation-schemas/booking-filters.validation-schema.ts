import * as yup from 'yup';

export const bookingFiltersSchema = yup.object({
  facility: yup.lazy(value => (typeof value === 'number' ? yup.number() : yup.string())),
  endDate: yup.date(),
  startDate: yup.date(),
  status: yup.string().oneOf(['pending', 'accepted', 'rejected', 'canceled', 'completed']),
});
