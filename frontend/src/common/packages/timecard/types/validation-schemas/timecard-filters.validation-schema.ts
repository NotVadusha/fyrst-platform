import * as yup from 'yup';
import { TimecardStatus } from 'shared/timecard-status';

export const timecardFiltersSchema = yup.object({
  createdAt: yup.date(),
  approvedAt: yup.date(),
  status: yup.string().oneOf(Object.values(TimecardStatus)),
  createdBy: yup.number(),
  approvedBy: yup.number().nullable(),
});
