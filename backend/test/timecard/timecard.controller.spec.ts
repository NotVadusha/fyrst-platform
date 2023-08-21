import { Test } from '@nestjs/testing';
import { TimecardController, TimecardService } from '../../src/timecard';
import {
  TestTimecard,
  createTimecardDtoMock,
  existingId,
  mockTimecardService,
  paginationLimitMock,
  paginationOffsetMock,
  timecardFiltersDtoMock,
  timecardsMock,
  updateTimecardDtoMock,
} from './timecard.mock';

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
      ],
    }).compile();

    timecardController = moduleRef.get<TimecardController>(TimecardController);
    timecardService = moduleRef.get<TimecardService>(TimecardService);
  });

  describe('getAllFiltered', () => {
    describe('when getAllFiltered is called', () => {
      let timecards: TestTimecard[];
      const expectedFilteredTimecards = timecardsMock
        .filter(t => t.approvedBy === timecardFiltersDtoMock.approvedBy)
        .slice(paginationOffsetMock, paginationLimitMock);

      beforeEach(async () => {
        timecards = await timecardController.getAllFiltered(
          timecardFiltersDtoMock,
          paginationLimitMock,
          paginationOffsetMock,
        );
      });

      test('it should call TimecardService', () => {
        expect(timecardService.getAllFiltered).toBeCalledWith(
          timecardFiltersDtoMock,
          paginationLimitMock,
          paginationOffsetMock,
        );
      });

      test('it should return filtered timecards', () => {
        expect(timecards).toEqual(expectedFilteredTimecards);
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
