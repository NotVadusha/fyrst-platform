import { NotificationsConfig } from '../../src/packages/notifications-config/entities/notifications-config.entity';
import { UpdateNotificationsConfigDto } from '../../src/packages/notifications-config/dto/update-config.dto';
import { CreateNotificationsConfigDto } from 'src/packages/notifications-config/dto/create-config-dto';

export interface TestNotificationsConfig {
  id?: number;
  userId: number;
  timecards: boolean;
  bookings: boolean;
  paymentSuccess: boolean;
  passwordChange: boolean;
  weeklyReport: boolean;
  moneySent: boolean;
}

export const notificationsConfigsMock: TestNotificationsConfig[] = [
  {
    id: 1,
    userId: 1,
    timecards: true,
    bookings: true,
    paymentSuccess: true,
    passwordChange: true,
    weeklyReport: true,
    moneySent: true,
  },
  {
    id: 2,
    userId: 2,
    timecards: true,
    bookings: false,
    paymentSuccess: false,
    passwordChange: true,
    weeklyReport: false,
    moneySent: true,
  },
  {
    id: 3,
    userId: 3,
    timecards: true,
    bookings: false,
    paymentSuccess: true,
    passwordChange: true,
    weeklyReport: false,
    moneySent: true,
  },
];

export const existingId = 1;
export const nonExistingId = -1;

export const createNotificationsConfigDtoMock: CreateNotificationsConfigDto = {
  userId: 4,
};

export const updateNotificationsConfigDtoMock: UpdateNotificationsConfigDto = {
  userId: existingId,
  weeklyReport: false,
};

export const mockedNotificationsConfig = notificationsConfigsMock[existingId];
export const mockedUpdateNotificationsConfig = {
  ...mockedNotificationsConfig,
  ...updateNotificationsConfigDtoMock,
};

export const mockedNotificationsConfigService = {
  create: jest.fn().mockImplementation((createConfigDto: CreateNotificationsConfigDto) => {
    return Promise.resolve({ id: 5, ...createConfigDto });
  }),
  getByUserId: jest.fn().mockImplementation((userId: number) => {
    return Promise.resolve(notificationsConfigsMock.find(c => c.userId === userId));
  }),
  update: jest
    .fn()
    .mockImplementation((updateNotificationsConfigDto: UpdateNotificationsConfigDto) => {
      return Promise.resolve({
        ...mockedNotificationsConfig,
        ...updateNotificationsConfigDto,
      });
    }),
  delete: jest.fn().mockImplementation(userId => {
    const deletedNotificationsConfig = notificationsConfigsMock.find(c => c.userId === userId);
    return Promise.resolve(deletedNotificationsConfig);
  }),
};

const buildModelMock = jest.fn().mockImplementation((partial: Partial<NotificationsConfig>) => ({
  ...partial,
  save: jest.fn().mockImplementation(() => {
    return Promise.resolve(notificationsConfigsMock[existingId]);
  }),
  destroy: jest.fn().mockImplementation(() => {
    return Promise.resolve(notificationsConfigsMock[existingId]);
  }),
}));

export const mockedNotificationsConfigModel = {
  findOne: jest.fn().mockImplementation((options?: { where?: { userId: number } }) => {
    const foundConfig = notificationsConfigsMock.find(c => c.userId === options?.where?.userId);
    if (options.where.userId) {
      return Promise.resolve(buildModelMock(foundConfig));
    }
    return null;
  }),
  build: buildModelMock,
};
