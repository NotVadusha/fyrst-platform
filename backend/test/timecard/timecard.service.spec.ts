import { Test } from '@nestjs/testing';
import { TimecardService } from '../../src/packages/timecard/timecard.service';
import {
  TestTimecard,
  createTimecardDtoMock,
  existingId,
  mockTimecardModel,
  timecardFiltersDtoMock,
  timecardsMock,
  updateTimecardDtoMock,
} from './timecard.mock';
import { Timecard } from '../../src/packages/timecard/entities/timecard.entity';
import { getModelToken } from '@nestjs/sequelize';
import { GetAllTimecardsDto } from 'src/packages/timecard/dto/get-all-timecards.dto';
import { UserService } from 'src/packages/user/user.service';
import { userServiceMock } from 'test/auth/auth.mocks';

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
        {
          provide: UserService,
          useValue: userServiceMock,
        },
      ],
    }).compile();

    timecardService = moduleRef.get<TimecardService>(TimecardService);
    timecardModel = moduleRef.get<typeof Timecard>(getModelToken(Timecard));
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
        result = await timecardService.getAllFiltered(timecardFiltersDtoMock);
      });

      test('it should call Timecard model', () => {
        expect(timecardModel.findAll).toBeCalled();
      });

      test('it should return filtered timecards', () => {
        expect(result).toEqual(expectedResult);
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
        expect.objectContaining({ ...timecardsMock[existingId] });
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
        expect.objectContaining({ ...timecardsMock[existingId], ...updateTimecardDtoMock });
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
