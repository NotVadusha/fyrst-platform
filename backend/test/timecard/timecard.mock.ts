import { EmptyResultError } from 'sequelize';
import { CreateTimecardDto, TimecardFiltersDto, UpdateTimecardDto } from '../../src/timecard/dto';
import { Timecard, TimecardStatus } from '../../src/timecard/entities';

export interface TestTimecard {
  id?: number;
  createdAt: Date;
  createdBy: number;
  bookingId: number;
  approvedAt: Date | null;
  approvedBy: number | null;
  status: TimecardStatus;
}

export const timecardsMock: TestTimecard[] = [
  {
    id: 0,
    createdAt: new Date(),
    createdBy: 1,
    bookingId: 2,
    approvedAt: null,
    approvedBy: null,
    status: TimecardStatus.Pending,
  },
  {
    id: 1,
    createdAt: new Date(),
    createdBy: 3,
    bookingId: 1,
    approvedAt: null,
    approvedBy: null,
    status: TimecardStatus.Pending,
  },
];

export const createTimecardDtoMock: CreateTimecardDto = {
  createdBy: 1,
  bookingId: 2,
};

export const updateTimecardDtoMock: UpdateTimecardDto = {
  bookingId: 3,
};

export const timecardFiltersDtoMock: TimecardFiltersDto = {
  approvedBy: null,
};

export const existingId = 0;
export const notExistingId = -1;
export const paginationLimitMock = 10;
export const paginationOffsetMock = 10;

export const mockTimecardService = {
  create: jest
    .fn()
    .mockImplementation((createTimecardDto: CreateTimecardDto) =>
      Promise.resolve({ id: 1, createdAt: new Date(), ...createTimecardDto }),
    ),
  getAllFiltered: jest
    .fn()
    .mockImplementation((filters: TimecardFiltersDto, limit: number, offset: number) =>
      Promise.resolve(
        timecardsMock.filter(t => (t.approvedBy = filters.approvedBy)).slice(offset, limit),
      ),
    ),
  getById: jest.fn().mockImplementation((id: number) => Promise.resolve(timecardsMock[id])),
  update: jest
    .fn()
    .mockImplementation((id: number, updateTimecardDto: UpdateTimecardDto) =>
      Promise.resolve({ ...timecardsMock[id], ...updateTimecardDto }),
    ),
  remove: jest.fn().mockImplementation((id: number) => Promise.resolve(timecardsMock[id])),
};

export const mockTimecardRepository = {
  instantiateEntity: jest.fn().mockImplementation((partial: Partial<Timecard>) => partial),
  create: jest
    .fn()
    .mockImplementation((entity: Timecard) =>
      Promise.resolve({ ...entity, id: expect.any(Number), createdAt: expect.any(Date) }),
    ),
  getAllFiltered: jest
    .fn()
    .mockImplementation((filters: TimecardFiltersDto, limit: number, offset: number) =>
      Promise.resolve(
        timecardsMock.filter(t => (t.approvedBy = filters.approvedBy)).slice(offset, limit),
      ),
    ),
  getById: jest.fn().mockImplementation((id: number) => Promise.resolve(timecardsMock[id])),
  update: jest.fn().mockImplementation((entity: Timecard) => Promise.resolve(entity)),
  remove: jest.fn().mockImplementation((entity: Timecard) => Promise.resolve(entity)),
};

const buildModelMock = jest.fn().mockImplementation((partial: Partial<Timecard>) => ({
  ...partial,
  save: jest.fn().mockImplementation(() => {
    return Promise.resolve(timecardsMock[existingId]);
  }),
  destroy: jest.fn().mockImplementation(() => {
    return Promise.resolve(timecardsMock[existingId]);
  }),
}));

export const mockTimecardModel = {
  findAll: jest
    .fn()
    .mockImplementation(
      (options?: { where?: { approvedBy: number | null }; limit?: number; offset?: number }) => {
        if (isNaN(options.limit) || isNaN(options.offset)) {
          throw new Error();
        }

        return Promise.resolve(
          timecardsMock
            .filter(t =>
              options.where.approvedBy === undefined
                ? true
                : t.approvedBy === options.where.approvedBy,
            )
            .slice(options.offset, options.limit),
        );
      },
    ),
  findOne: jest.fn().mockImplementation((options: { where: { id: number } }) => {
    if (options.where.id === existingId) {
      return Promise.resolve(buildModelMock(timecardsMock[existingId]));
    } else {
      throw new EmptyResultError('');
    }
  }),
  build: buildModelMock,
};
