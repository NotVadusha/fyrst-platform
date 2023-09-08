import { Test } from '@nestjs/testing';
import { TimecardController } from '../../src/packages/timecard/timecard.controller';
import { TimecardService } from '../../src/packages/timecard/timecard.service';
import {
  TestTimecard,
  createTimecardDtoMock,
  existingId,
  mockTimecardService,
  timecardFiltersDtoMock,
  timecardsMock,
  updateTimecardDtoMock,
} from './timecard.mock';
import { GetAllTimecardsDto } from '../../src/packages/timecard/dto/get-all-timecards.dto';
import { Timecard } from '../../src/packages/timecard/entities/timecard.entity';
import { UserService } from 'src/packages/user/user.service';

describe('TimecardController', () => {
  let timecardController: TimecardController;
  let timecardService: TimecardService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      controllers: [TimecardController],
      providers: [
        {
          provide: TimecardService,
          useValue: mockTimecardService,
        },
        {
          provide: UserService,
          useValue: {},
        },
      ],
    }).compile();

    timecardController = moduleRef.get<TimecardController>(TimecardController);
    timecardService = moduleRef.get<TimecardService>(TimecardService);
  });

  describe('getAllFiltered', () => {
    describe('when getAllFiltered is called', () => {
      let result: GetAllTimecardsDto;
      const expectedFilteredTimecards = timecardsMock
        .filter(t => t.approvedAt === timecardFiltersDtoMock.approvedAt)
        .slice(timecardFiltersDtoMock.offset, timecardFiltersDtoMock.limit);
      const expectedResult: GetAllTimecardsDto = {
        items: expectedFilteredTimecards as Timecard[],
        total: timecardsMock.length,
      };

      beforeEach(async () => {
        result = await timecardController.getAllFiltered(timecardFiltersDtoMock);
      });

      test('it should call TimecardService', () => {
        expect(timecardService.getAllFiltered).toBeCalled();
      });

      test('it should return filtered timecards', () => {
        expect(result).toEqual(expectedResult);
      });
    });
  });

  describe('getById', () => {
    describe('when getById is called', () => {
      let timecard: TestTimecard;
      const expectedTimecard = timecardsMock[0];

      beforeEach(async () => {
        timecard = await timecardController.getById(expectedTimecard.id);
      });

      test('it should call TimecardService', () => {
        expect(timecardService.getById).toBeCalledWith(expectedTimecard.id);
      });

      test('it should return timecard', () => {
        expect(timecard).toEqual(expectedTimecard);
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let timecard: TestTimecard;

      beforeEach(async () => {
        timecard = await timecardController.create(createTimecardDtoMock);
      });

      test('it should call TimecardService', () => {
        expect(timecardService.create).toBeCalledWith(createTimecardDtoMock);
      });

      test('it should create new timecard and return it', () => {
        expect(timecard).toEqual({
          ...createTimecardDtoMock,
          id: expect.any(Number),
          createdAt: expect.any(Date),
        });
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let timecard: TestTimecard;

      beforeEach(async () => {
        timecard = await timecardController.update(existingId, updateTimecardDtoMock);
      });

      test('it should call TimecardService', () => {
        expect(timecardService.update).toBeCalledWith(existingId, updateTimecardDtoMock);
      });

      test('it should update existing timecard and return it', () => {
        expect(timecard).toEqual({
          ...timecardsMock[existingId],
          ...updateTimecardDtoMock,
        });
      });
    });
  });

  describe('remove', () => {
    describe('when remove is called', () => {
      let timecard: TestTimecard;

      beforeEach(async () => {
        timecard = await timecardController.remove(existingId);
      });

      test('it should call TimecardService', () => {
        expect(timecardService.remove).toBeCalledWith(existingId);
      });

      test('it should remove existing timecard and return it', () => {
        expect(timecard).toEqual(timecardsMock[existingId]);
      });
    });
  });
});
