import { Provider } from '@nestjs/common';
import { TIMECARD_SERVICE_INJECTION_TOKEN } from '../constants';
import { TimecardService } from '../timecard.service';

export const timecardServiceProvider: Provider = {
  provide: TIMECARD_SERVICE_INJECTION_TOKEN,
  useClass: TimecardService,
};
