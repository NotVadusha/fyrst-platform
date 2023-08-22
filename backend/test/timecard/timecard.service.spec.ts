import { Test } from '@nestjs/testing';
import { TimecardService } from '../../src/packages/timecard/timecard.service';
import {
  TestTimecard,
  createTimecardDtoMock,
  existingId,
  mockTimecardModel,
  paginationLimitMock,
  paginationOffsetMock,
  timecardFiltersDtoMock,
  timecardsMock,
  updateTimecardDtoMock,
} from './timecard.mock';
import { Timecard } from '../../src/packages/timecard/entities/timecard.entity';
import { getModelToken } from '@nestjs/sequelize';

describe('TimecardService', () => {
  let timecardService: TimecardService;
  let timecardModel: typeof Timecard;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        TimecardService,
        {
          provide: getModelToken(Timecard),
          useValue: mockTimecardModel,
        },
      ],
    }).compile();

    timecardService = moduleRef.get<TimecardService>(TimecardService);
    timecardModel = moduleRef.get<typeof Timecard>(getModelToken(Timecard));
  });

  describe('getAllFiltered', () => {
    describe('when getAllFiltered is called', () => {
      let timecards: TestTimecard[];
      const expectedFilteredTimecards = timecardsMock
        .filter(t => t.approvedBy === timecardFiltersDtoMock.approvedBy)
        .slice(paginationOffsetMock, paginationLimitMock);

      beforeEach(async () => {
        timecards = await timecardService.getAllFiltered(
          timecardFiltersDtoMock,
          paginationLimitMock,
          paginationOffsetMock,
        );
      });

      test('it should call Timecard model', () => {
        expect(timecardModel.findAll).toBeCalled();
      });

      test('it should return filtered timecards', () => {
        expect(timecards).toEqual(expectedFilteredTimecards);
      });
    });
  });

  describe('getById', () => {
    describe('when getById is called', () => {
      let timecard: TestTimecard;
      const expectedTimecard = timecardsMock[existingId];

      beforeEach(async () => {
        timecard = await timecardService.getById(expectedTimecard.id);
      });

      test('it should call Timecard model', () => {
        expect(timecardModel.findOne).toBeCalled();
      });

      test('it should return a timecard', () => {
        expect.objectContaining({ ...expectedTimecard });
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let timecard: TestTimecard;

      beforeEach(async () => {
        timecard = await timecardService.create(createTimecardDtoMock);
      });

      test('it should call Timecard model', () => {
        expect(timecardModel.build).toBeCalled();
      });

      test('it should create new timecard and return it', () => {
        console.debug(timecard);

        expect(timecard).toEqual(timecardsMock[existingId]);
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let timecard: TestTimecard;

      beforeEach(async () => {
        timecard = await timecardService.update(existingId, updateTimecardDtoMock);
      });

      test('it should call Timecard model', () => {
        expect(timecardModel.findOne).toBeCalled();
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
      const expectedTimecard = timecardsMock[existingId];

      beforeEach(async () => {
        timecard = await timecardService.remove(existingId);
      });

      test('it should call Timecard model', () => {
        expect(timecardModel.findOne).toBeCalled();
      });

      test('it should remove existing timecard and return it', () => {
        expect.objectContaining({ ...expectedTimecard });
      });
    });
  });
});
