import { NotificationsConfigService } from '../../src/packages/notifications-config/notifications-config.service';
import { NotificationsConfigController } from '../../src/packages/notifications-config/notifications-config.controller';
import {
  TestNotificationsConfig,
  createNotificationsConfigDtoMock,
  mockedNotificationsConfig,
  mockedNotificationsConfigService,
  mockedUpdateNotificationsConfig,
  updateNotificationsConfigDtoMock,
} from './notifications-config.mock';
import { Test } from '@nestjs/testing';

describe('NotificationsConfigController', () => {
  let notificationsConfigController: NotificationsConfigController;
  let notificationsConfigService: NotificationsConfigService;

  beforeEach(async () => {
    jest.clearAllMocks();

    const moduleRef = await Test.createTestingModule({
      controllers: [NotificationsConfigController],
      providers: [
        {
          provide: NotificationsConfigService,
          useValue: mockedNotificationsConfigService,
        },
      ],
    }).compile();

    notificationsConfigController = moduleRef.get<NotificationsConfigController>(
      NotificationsConfigController,
    );
    notificationsConfigService = moduleRef.get<NotificationsConfigService>(
      NotificationsConfigService,
    );
  });

  describe('getByUserId', () => {
    describe('when getByUserId is called', () => {
      let config: TestNotificationsConfig;

      beforeEach(async () => {
        config = await notificationsConfigController.getByUserId(mockedNotificationsConfig.userId);
      });

      test('then it should call notificationsConfigService', () => {
        expect(notificationsConfigService.getByUserId).toHaveBeenCalledWith(
          mockedNotificationsConfig.userId,
        );
      });

      test('then it should return the user config', () => {
        expect(config).toEqual(mockedNotificationsConfig);
      });
    });
  });

  describe('update', () => {
    describe('when update is called', () => {
      let config: TestNotificationsConfig;

      beforeEach(async () => {
        config = await notificationsConfigController.update(updateNotificationsConfigDtoMock);
      });

      test('then it should call notificationsConfigService', () => {
        expect(notificationsConfigService.update).toHaveBeenCalledWith(
          updateNotificationsConfigDtoMock,
        );
      });

      test('then it should return the user config', () => {
        expect(config).toEqual(mockedUpdateNotificationsConfig);
      });
    });
  });

  describe('create', () => {
    describe('when create is called', () => {
      let config: TestNotificationsConfig;

      beforeEach(async () => {
        config = await notificationsConfigController.create(createNotificationsConfigDtoMock);
      });

      test('then it should call notificationsConfigService', () => {
        expect(notificationsConfigService.create).toHaveBeenCalledWith(
          createNotificationsConfigDtoMock,
        );
      });

      test('then it should return the user config', () => {
        expect(config).toEqual({
          ...createNotificationsConfigDtoMock,
          id: expect.any(Number),
        });
      });
    });
  });
  describe('delete', () => {
    describe('when delete is called', () => {
      let config: TestNotificationsConfig;

      beforeEach(async () => {
        config = await notificationsConfigController.delete(mockedNotificationsConfig.userId);
      });

      test('then it should call notificationsConfigService', () => {
        expect(notificationsConfigService.delete).toHaveBeenCalledWith(
          mockedNotificationsConfig.userId,
        );
      });

      test('then it should return the user config', () => {
        expect(config).toEqual(mockedNotificationsConfig);
      });
    });
  });
});
