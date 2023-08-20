import { Test } from '@nestjs/testing';
import { TIMECARD_REPO_INJECTION_TOKEN, TIMECARD_SERVICE_INJECTION_TOKEN } from '../constants';
import { Timecard } from '../entities';
import { ITimecardRepository } from '../interfaces';
import { timecardServiceProvider } from '../providers';
import { TimecardRepository } from '../timecard.repository';
import { TimecardService } from '../timecard.service';
import {
  TestTimecard,
  createTimecardDtoMock,
  existingId,
  timecardsMock,
  updateTimecardDtoMock,
} from './mocks';

describe('TimecardService', () => {
  let timecardService: TimecardService;
  let timecardRepository: TimecardRepository;

  const mockTimecardRepository: ITimecardRepository = {
    instantiateEntity: jest.fn().mockImplementation((partial: Partial<Timecard>) => partial),
    create: jest
      .fn()
      .mockImplementation((entity: Timecard) =>
        Promise.resolve({ ...entity, id: expect.any(Number), createdAt: expect.any(Date) }),
      ),
    getAll: jest.fn().mockResolvedValue(timecardsMock),
    getById: jest.fn().mockImplementation((id: number) => Promise.resolve(timecardsMock[id])),
    update: jest.fn().mockImplementation((entity: Timecard) => Promise.resolve(entity)),
    remove: jest.fn().mockImplementation((entity: Timecard) => Promise.resolve(entity)),
  };

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      providers: [
        timecardServiceProvider,
        {
          provide: TIMECARD_REPO_INJECTION_TOKEN,
          useValue: mockTimecardRepository,
        },
      ],
    }).compile();

    timecardService = moduleRef.get<TimecardService>(TIMECARD_SERVICE_INJECTION_TOKEN);
    timecardRepository = moduleRef.get<TimecardRepository>(TIMECARD_REPO_INJECTION_TOKEN);
  });

  describe('getAll', () => {
    describe('when getAll is called', () => {
      let timecards: TestTimecard[];

      beforeEach(async () => {
        timecards = await timecardService.getAll();
      });

      test('it should call TimecardRepository', () => {
        expect(timecardRepository.getAll).toBeCalled();
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
