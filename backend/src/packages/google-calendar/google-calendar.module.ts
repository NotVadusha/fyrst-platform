import { Module } from '@nestjs/common';
import { GoogleCalendarService } from './google-calendar.service';
import { RedisModule } from '../redis/redis.module';

@Module({
  exports: [GoogleCalendarService],
  imports: [RedisModule],
  providers: [GoogleCalendarService],
})
export class GoogleCalendarModule {}
