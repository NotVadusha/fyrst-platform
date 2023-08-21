import { CreateTimecardDto, UpdateTimecardDto } from '../../src/timecard/dto';
import { Timecard } from '../../src/timecard/entities';
import { ITimecardRepository, ITimecardService } from '../../src/timecard/interfaces';

export interface TestTimecard {
  id?: number;
  createdAt: Date;
  createdBy: number;
  bookingId: number;
}

export const timecardsMock: TestTimecard[] = [
  {
    id: 0,
    createdAt: new Date(),
    createdBy: 1,
    bookingId: 2,
  },
  {
    id: 1,
    createdAt: new Date(),
    createdBy: 3,
    bookingId: 1,
  },
];

export const createTimecardDtoMock: CreateTimecardDto = {
  createdBy: 1,
  bookingId: 2,
};

export const updateTimecardDtoMock: UpdateTimecardDto = {
  bookingId: 3,
};

export const existingId = 0;
export const notExistingId = -1;

export const mockTimecardService: ITimecardService = {
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

export const mockTimecardRepository: ITimecardRepository = {
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
