import { Provider } from '@nestjs/common';
import { TIMECARD_REPO_INJECTION_TOKEN } from '../constants';
import { TimecardRepository } from '../timecard.repository';

export const timecardRepoProvider: Provider = {
  provide: TIMECARD_REPO_INJECTION_TOKEN,
  useClass: TimecardRepository,
};
