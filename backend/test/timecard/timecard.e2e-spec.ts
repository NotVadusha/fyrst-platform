import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { Timecard, TimecardModule } from '../../src/timecard';
import {
  createTimecardDtoMock,
  existingId,
  mockTimecardModel,
  notExistingId,
  paginationLimitMock,
  paginationOffsetMock,
  timecardFiltersDtoMock,
  timecardsMock,
  updateTimecardDtoMock,
} from './timecard.mock';

const timecardApiPrefix = '/timecard';

describe('TimecardModule', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TimecardModule],
    })
      .overrideProvider(getModelToken(Timecard))
      .useValue(mockTimecardModel)
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
        .expect(timecardsMock.map(t => ({ ...t, createdAt: t.createdAt.toISOString() })));
    });

    it('should return array of timecards matching passed filter', () => {
      return request(app.getHttpServer())
        .get(`${timecardApiPrefix}/`)
        .send(timecardFiltersDtoMock)
        .expect(HttpStatus.OK)
        .expect(
          timecardsMock
            .filter(t => t.approvedBy === timecardFiltersDtoMock.approvedBy)
            .map(t => ({ ...t, createdAt: t.createdAt.toISOString() })),
        );
    });

    it('should return array of timecards with pagination', () => {
      return request(app.getHttpServer())
        .get(`${timecardApiPrefix}/`)
        .query({ limit: paginationLimitMock, offset: paginationOffsetMock })
        .expect(HttpStatus.OK)
        .expect(
          timecardsMock
            .slice(paginationOffsetMock, paginationLimitMock)
            .map(t => ({ ...t, createdAt: t.createdAt.toISOString() })),
        );
    });

    it('should return 400 when invalid filters are passed', () => {
      return request(app.getHttpServer())
        .get(`${timecardApiPrefix}/`)
        .send({ approvedBy: 'lorem ipsum' })
        .expect(HttpStatus.BAD_REQUEST);
    });

    it('should return 400 when invalid pagination params are passed', () => {
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
