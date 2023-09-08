import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Timecard } from '../../src/packages/timecard/entities/timecard.entity';
import { TimecardModule } from '../../src/packages/timecard/timecard.module';
import { UserModule } from '../../src/packages/user/user.module';
import { UserModuleMock } from '../common/UserModuleMock';
import {
  createTimecardDtoMock,
  existingId,
  mockTimecardModel,
  notExistingId,
  timecardFiltersDtoMock,
  timecardsMock,
  updateTimecardDtoMock,
} from './timecard.mock';
import { UserService } from 'src/packages/user/user.service';

const timecardApiPrefix = '/timecard';

jest.mock('../../src/packages/roles/guards/roles.guard.ts', () => ({
  RoleGuard: () => ({ canActivate: jest.fn(() => true) }),
}));
jest.mock('../../src/packages/permissions/guards/permissions.guard.ts', () => ({
  PermissionsGuard: () => ({ canActivate: jest.fn(() => true) }),
}));

describe('TimecardModule', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TimecardModule],
      providers: [],
    })
      .overrideModule(UserModule)
      .useModule(UserModuleMock)
      .overrideProvider(UserService)
      .useValue({})
      .overrideProvider(getModelToken(Timecard))
      .useValue(mockTimecardModel)
      .overrideProvider(UserService)
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(() => app.close());

  describe('/ (GET)', () => {
    it('should return array of timecards if there are any', () => {
      return request(app.getHttpServer())
        .get(`${timecardApiPrefix}/`)
        .expect(HttpStatus.OK)
        .expect({
          total: timecardsMock.length,
          items: timecardsMock.map(t => ({ ...t, createdAt: t.createdAt.toISOString() })),
        });
    });

    it('should return array of timecards matching passed filter', () => {
      return request(app.getHttpServer())
        .get(`${timecardApiPrefix}/`)
        .send(timecardFiltersDtoMock)
        .expect(HttpStatus.OK)
        .expect({
          total: timecardsMock.length,
          items: timecardsMock.map(t => ({ ...t, createdAt: t.createdAt.toISOString() })),
        });
    });

    it('should return array of timecards with pagination', () => {
      return request(app.getHttpServer())
        .get(`${timecardApiPrefix}/`)
        .query({ limit: timecardFiltersDtoMock.limit, offset: timecardFiltersDtoMock.offset })
        .expect(HttpStatus.OK)
        .expect({
          total: timecardsMock.length,
          items: timecardsMock
            .slice(timecardFiltersDtoMock.offset, timecardFiltersDtoMock.limit)
            .map(t => ({ ...t, createdAt: t.createdAt.toISOString() })),
        });
    });

    it('should return 400 when invalid filters are passed', () => {
      return request(app.getHttpServer())
        .get(`${timecardApiPrefix}/`)
        .query({ limit: 'lorem', offset: 'ipsum' })
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/:id (GET)', () => {
    it('should return timecard by existing id', () => {
      return request(app.getHttpServer())
        .get(`${timecardApiPrefix}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect({
          ...timecardsMock[existingId],
          createdAt: timecardsMock[existingId].createdAt.toISOString(),
        });
    });

    it('should return 404 when not existing id is passed', () => {
      return request(app.getHttpServer())
        .get(`${timecardApiPrefix}/${notExistingId}`)
        .expect(HttpStatus.NOT_FOUND);
    });
  });

  describe('/ (POST)', () => {
    it('should create a timecard and return it', () => {
      return request(app.getHttpServer())
        .post(`${timecardApiPrefix}`)
        .send(createTimecardDtoMock)
        .expect(HttpStatus.CREATED)
        .expect({
          ...timecardsMock[existingId],
          ...createTimecardDtoMock,
          createdAt: timecardsMock[existingId].createdAt.toISOString(),
        });
    });

    it('should return validation error when empty dto is passed', () => {
      return request(app.getHttpServer())
        .post(`${timecardApiPrefix}`)
        .send({})
        .expect(HttpStatus.BAD_REQUEST);
    });
  });

  describe('/:id (PATCH)', () => {
    it('should update a timecard and return it', () => {
      return request(app.getHttpServer())
        .patch(`${timecardApiPrefix}/${existingId}`)
        .send(updateTimecardDtoMock)
        .expect(HttpStatus.OK)
        .expect({
          ...timecardsMock[existingId],
          ...createTimecardDtoMock,
          createdAt: timecardsMock[existingId].createdAt.toISOString(),
        });
    });

    it('should return validation error when invalid update dto is passed', () => {
      return request(app.getHttpServer())
        .patch(`${timecardApiPrefix}/${existingId}`)
        .send({
          bookingId: 'asdasdasd',
        })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 500 when not existing id is passed', () => {
      return request(app.getHttpServer())
        .patch(`${timecardApiPrefix}/${notExistingId}`)
        .send(updateTimecardDtoMock)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });

  describe('/:id (DELETE)', () => {
    it('should remove a timecard and return it', () => {
      return request(app.getHttpServer())
        .delete(`${timecardApiPrefix}/${existingId}`)
        .expect(HttpStatus.OK)
        .expect({
          ...timecardsMock[existingId],
          createdAt: timecardsMock[existingId].createdAt.toISOString(),
        });
    });

    it('should return 500 when not existing id is passed', () => {
      return request(app.getHttpServer())
        .delete(`${timecardApiPrefix}/${notExistingId}`)
        .expect(HttpStatus.INTERNAL_SERVER_ERROR);
    });
  });
});
