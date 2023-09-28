import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { Auth, google } from 'googleapis';
import { RedisService } from '../redis/redis.service';
import { CreateCalendarEventDto } from '../calendar-events/dto/create-calendar-event.dto';
import { format } from 'date-fns';

@Injectable()
export class GoogleCalendarService {
  private logger = new Logger(GoogleCalendarService.name);
  constructor(private readonly redisService: RedisService) {}

  async createEvent(event: CreateCalendarEventDto, userId: number) {
    try {
      const auth = await this.getAuth(userId);
      const calendar = google.calendar({ version: 'v3', auth: auth });
      await calendar.events.insert({
        calendarId: 'primary',
        requestBody: {
          summary: event.name,
          description: event.description,
          start: { date: format(event.startDate, 'yyyy-M-d') },
          end: { date: format(event.endDate, 'yyyy-M-d') },
        },
      });
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async getAuth(userId: number): Promise<Auth.OAuth2Client> {
    try {
      const accessToken = await this.redisService.get(`google_access_token_${userId}`);
      if (!accessToken) {
        throw new Error('Access token not found for user.');
      }

      const client = new google.auth.OAuth2();
      client.setCredentials({ access_token: accessToken });
      return client;
    } catch (error) {
      throw new InternalServerErrorException('Cant create google event');
    }
  }
}
