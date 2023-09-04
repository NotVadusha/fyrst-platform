import { Test, TestingModule } from '@nestjs/testing';
import { CalendarController } from '../../src/packages/calendar/calendar.controller';
import { CalendarService } from '../../src/packages/calendar/calendar.service';

describe('CalendarController', () => {
  let controller: CalendarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarController],
      providers: [CalendarService],
    }).compile();

    controller = module.get<CalendarController>(CalendarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
