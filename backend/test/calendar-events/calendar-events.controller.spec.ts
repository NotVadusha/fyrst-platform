import { Test, TestingModule } from '@nestjs/testing';
import { CalendarEventsController } from '../../src/packages/calendar-events/calendar-events.controller';
import { CalendarEventsService } from '../../src/packages/calendar-events/calendar-events.service';

describe('CalendarEventsController', () => {
  let controller: CalendarEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarEventsController],
      providers: [CalendarEventsService],
    }).compile();

    controller = module.get<CalendarEventsController>(CalendarEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
