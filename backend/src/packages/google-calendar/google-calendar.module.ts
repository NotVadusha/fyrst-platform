import { Logger, Module } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  exports: [GoogleCalendarService],
  imports: [RedisModule],
  providers: [GoogleCalendarService, Logger],
})
export class GoogleCalendarModule {}
