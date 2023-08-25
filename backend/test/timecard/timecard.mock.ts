import { EmptyResultError } from 'sequelize';
import { CreateTimecardDto } from '../../src/packages/timecard/dto/create-timecard.dto';
import { UpdateTimecardDto } from '../../src/packages/timecard/dto/update-timecard.dto';
import { TimecardFiltersDto } from '../../src/packages/timecard/dto/timecard-filters.dto';
import { Timecard } from '../../src/packages/timecard/entities/timecard.entity';
import { TimecardStatus } from 'shared/timecard-status';

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
  bookingId: 2,
};

export const timecardFiltersDtoMock: TimecardFiltersDto = {
  approvedBy: null,
};

export const existingId = 0;
export const notExistingId = -1;
export const paginationLimitMock = 10;
export const paginationOffsetMock = 10;

export const expectedUpdatedTimecard = {
  ...timecardsMock[existingId],
  ...updateTimecardDtoMock,
};

export const mockTimecardService = {
  create: jest
    .fn()
    .mockImplementation((createTimecardDto: CreateTimecardDto) =>
      Promise.resolve({ id: 1, createdAt: new Date(), ...createTimecardDto }),
    ),
  getAllFiltered: jest
    .fn()
    .mockImplementation((filters: TimecardFiltersDto, limit: number, offset: number) => {
      const items = timecardsMock
        .filter(t => (t.approvedBy = filters.approvedBy))
        .slice(offset, limit);

      const total = timecardsMock.length;

      return Promise.resolve({ items, total });
    }),
  getById: jest.fn().mockImplementation((id: number) => Promise.resolve(timecardsMock[id])),
  update: jest
    .fn()
    .mockImplementation((id: number, updateTimecardDto: UpdateTimecardDto) =>
      Promise.resolve({ ...timecardsMock[id], ...updateTimecardDto }),
    ),
  remove: jest.fn().mockImplementation((id: number) => Promise.resolve(timecardsMock[id])),
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
  count: jest.fn().mockResolvedValue(timecardsMock.length),
};
