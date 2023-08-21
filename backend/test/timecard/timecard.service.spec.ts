import { Test } from '@nestjs/testing';
import { TimecardRepository, TimecardService } from '../../src/timecard';
import {
  TestTimecard,
  createTimecardDtoMock,
  existingId,
  mockTimecardRepository,
  paginationLimitMock,
  paginationOffsetMock,
  timecardFiltersDtoMock,
  timecardsMock,
  updateTimecardDtoMock,
} from './timecard.mock';

describe('TimecardService', () => {
  let timecardService: TimecardService;
  let timecardRepository: TimecardRepository;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        TimecardService,
        {
          provide: TimecardRepository,
          useValue: mockTimecardRepository,
        },
      ],
    }).compile();

    timecardService = moduleRef.get<TimecardService>(TimecardService);
    timecardRepository = moduleRef.get<TimecardRepository>(TimecardRepository);
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

      test('it should call TimecardRepository', () => {
        expect(timecardRepository.getAllFiltered).toBeCalledWith(
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
        timecard = await timecardService.getById(expectedTimecard.id);
      });

      test('it should call TimecardRepository', () => {
        expect(timecardRepository.getById).toBeCalledWith(expectedTimecard.id);
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
        timecard = await timecardService.create(createTimecardDtoMock);
      });

      test('it should call TimecardRepository', () => {
        expect(timecardRepository.instantiateEntity).toBeCalledWith(createTimecardDtoMock);
        expect(timecardRepository.create).toBeCalledWith(createTimecardDtoMock);
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
        timecard = await timecardService.update(existingId, updateTimecardDtoMock);
      });

      test('it should call TimecardRepository', () => {
        expect(timecardRepository.getById).toBeCalledWith(existingId);
        expect(timecardRepository.update).toBeCalledWith({
          ...timecardsMock[existingId],
          ...updateTimecardDtoMock,
        });
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
        timecard = await timecardService.remove(existingId);
      });

      test('it should call TimecardRepository', () => {
        expect(timecardRepository.getById).toBeCalledWith(existingId);
        expect(timecardRepository.remove).toBeCalledWith(timecardsMock[existingId]);
      });

      test('it should remove existing timecard and return it', () => {
        expect(timecard).toEqual(timecardsMock[existingId]);
      });
    });
  });
});
