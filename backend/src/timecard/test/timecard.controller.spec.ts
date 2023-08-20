import { Test } from '@nestjs/testing';
import { TIMECARD_SERVICE_INJECTION_TOKEN } from '../constants';
import { CreateTimecardDto, UpdateTimecardDto } from '../dto';
import { TimecardController } from '../timecard.controller';
import { TimecardService } from '../timecard.service';
import {
  TestTimecard,
  createTimecardDtoMock,
  existingId,
  timecardsMock,
  updateTimecardDtoMock,
} from './mocks';
import { ITimecardService } from '../interfaces';

describe('TimecardController', () => {
  let timecardController: TimecardController;
  let timecardService: TimecardService;

  const mockTimecardService: ITimecardService = {
    create: jest
      .fn()
      .mockImplementation((createTimecardDto: CreateTimecardDto) =>
        Promise.resolve({ id: 1, createdAt: new Date(), ...createTimecardDto }),
      ),
    getAll: jest.fn().mockResolvedValue(timecardsMock),
    getById: jest.fn().mockImplementation((id: number) => Promise.resolve(timecardsMock[id])),
    update: jest
      .fn()
      .mockImplementation((id: number, updateTimecardDto: UpdateTimecardDto) =>
        Promise.resolve({ ...timecardsMock[id], ...updateTimecardDto }),
      ),
    remove: jest.fn().mockImplementation((id: number) => Promise.resolve(timecardsMock[id])),
  };

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
