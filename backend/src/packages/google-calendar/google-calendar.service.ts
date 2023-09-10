import { Injectable } from '@nestjs/common';
import { Auth, google } from 'googleapis';
import { RedisService } from '../redis/redis.service';
import { CreateCalendarEventDto } from '../calendar-events/dto/create-calendar-event.dto';

@Injectable()
export class GoogleCalendarService {
  constructor(private readonly redisService: RedisService) {}

  async createEvent(event: CreateCalendarEventDto, userId: number) {
    const auth = await this.geAuth(userId);
    const calendar = google.calendar({ version: 'v3', auth: auth });
    await calendar.events.insert({
      calendarId: 'primary',
      requestBody: {
        summary: event.name,
        description: event.description,
        start: { dateTime: event.startDate.toISOString() },
        end: { dateTime: event.endDate.toISOString() },
      },
    });
  }

  private async geAuth(userId: number): Promise<Auth.OAuth2Client> {
    const accessToken = await this.redisService.get(`google_access_token_${userId}`);
    const client = new google.auth.OAuth2();
    client.setCredentials({ access_token: accessToken });
    return client;
  }
}
