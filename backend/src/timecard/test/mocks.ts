import { CreateTimecardDto, UpdateTimecardDto } from '../dto';

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
