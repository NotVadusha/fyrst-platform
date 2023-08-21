import { Test } from '@nestjs/testing';
import { TIMECARD_SERVICE_INJECTION_TOKEN } from '../../src/timecard/constants';
import { TimecardController, TimecardService } from '../../src/timecard';
import {
  TestTimecard,
  createTimecardDtoMock,
  existingId,
  mockTimecardService,
  timecardsMock,
  updateTimecardDtoMock,
} from './timecard.mocks';

describe('TimecardController', () => {
  let timecardController: TimecardController;
  let timecardService: TimecardService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      controllers: [TimecardController],
      providers: [
        {
          provide: TIMECARD_SERVICE_INJECTION_TOKEN,
          useValue: mockTimecardService,
        },
      ],
    }).compile();

    timecardController = moduleRef.get<TimecardController>(TimecardController);
    timecardService = moduleRef.get<TimecardService>(TIMECARD_SERVICE_INJECTION_TOKEN);
  });

  describe('getAll', () => {
    describe('when getAll is called', () => {
      let timecards: TestTimecard[];

      beforeEach(async () => {
        timecards = await timecardController.getAll();
      });

      test('it should call TimecardService', () => {
        expect(timecardService.getAll).toBeCalled();
      });

      test('it should return all timecards', () => {
        expect(timecards).toEqual(timecardsMock);
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
