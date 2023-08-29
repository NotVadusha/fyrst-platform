import { Test, TestingModule } from '@nestjs/testing';
import { NotificationConfig } from '../../src/packages/notifications-config/entities/notifications-config.entity';
import { NotificationsConfigService } from '../../src/packages/notifications-config/notifications-config.service';
import {
  notificationsConfigsMock,
  mockedNotificationsConfigService,
  mockedNotificationsConfig,
  mockedUpdateNotificationsConfig,
  TestNotificationsConfig,
  existingId,
  mockedNotificationsConfigModel,
  createNotificationsConfigDtoMock,
  updateNotificationsConfigDtoMock,
} from './notifications-config.mock';
import { getModelToken } from '@nestjs/sequelize';

describe('NotificationsConfigService', () => {
  let service: NotificationsConfigService;
  let notificationConfigModel: typeof NotificationConfig;

  beforeEach(async () => {
    jest.clearAllMocks();
    const moduleRef = await Test.createTestingModule({
      providers: [
        NotificationsConfigService,
        {
          provide: getModelToken(NotificationConfig),
          useValue: mockedNotificationsConfigModel,
        },
      ],
    }).compile();

    service = moduleRef.get<NotificationsConfigService>(NotificationsConfigService);
    notificationConfigModel = moduleRef.get<typeof NotificationConfig>(
      getModelToken(NotificationConfig),
    );
  });

  describe('create', () => {
    describe('when create is called', () => {
      let notificationConfig: TestNotificationsConfig;

      beforeEach(async () => {
        notificationConfig = await service.create(createNotificationsConfigDtoMock);
      });

      test('it should call NotificationConfig model', () => {
        expect(notificationConfigModel.build).toBeCalled();
      });

      test('it should create new notification config and return it', () => {
        expect.objectContaining({ ...notificationsConfigsMock[existingId] });
      });
    });
  });

  describe('getByUserId', () => {
    describe('when getByUserId is called', () => {
      let notificationConfig: TestNotificationsConfig;
      const expectedConfig = notificationsConfigsMock[existingId];

      beforeEach(async () => {
        notificationConfig = await service.getByUserId(expectedConfig.userId);
      });

      test('it should call NotificationConfig model', () => {
        expect(notificationConfigModel.findOne).toBeCalled();
      });

      test('it should return notification config', () => {
        expect.objectContaining({ ...expectedConfig });
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let notificationConfig: TestNotificationsConfig;

      beforeEach(async () => {
        notificationConfig = await service.update(updateNotificationsConfigDtoMock);
      });

      test('it should call NotificationConfig model', () => {
        expect(notificationConfigModel.findOne).toBeCalled();
      });

      test('it should return notification config', () => {
        expect.objectContaining({ ...mockedUpdateNotificationsConfig });
      });
    });
  });

  describe('delete', () => {
    describe('when delete is called', () => {
      let notificationConfig: TestNotificationsConfig;
      const expectedConfig = notificationsConfigsMock[existingId];

      beforeEach(async () => {
        notificationConfig = await service.delete(expectedConfig.userId);
      });

      test('it should call NotificationConfig model', () => {
        expect(notificationConfigModel.findOne).toBeCalled();
      });

      test('it should remove notification config and return it', () => {
        expect.objectContaining({ ...expectedConfig });
      });
    });
  });
});
