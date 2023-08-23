import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from 'src/packages/redis/redis.service';
import {
  cacheProvider,
  existingKey,
  nonEexistingKey,
  testKey,
  testTtl,
  testValue,
} from './redis.mocks';

describe('RedisService', () => {
  let service: RedisService;
  let cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RedisService, cacheProvider],
    }).compile();

    service = module.get<RedisService>(RedisService);
    cache = module.get(CACHE_MANAGER);
  });

  describe('get', () => {
    describe('should return cached value if exists', () => {
      let result: unknown;

      beforeEach(async () => {
        result = await service.get(existingKey);
      });

      test('it should call cache get method', () => {
        expect(cache.get).toHaveBeenCalledWith(existingKey);
      });

      test('it should return a value', () => {
        expect(result).toEqual('rty');
      });
    });

    describe('should return undefined for non-existent key', () => {
      let result: unknown;

      beforeEach(async () => {
        result = await service.get(nonEexistingKey);
      });

      test('it should return undefined', () => {
        expect(result).toBeUndefined();
      });
    });
  });

  describe('set', () => {
    describe('should set a value in cache', () => {
      beforeEach(async () => {
        await service.set(testKey, testValue, testTtl);
      });

      test('it should call cache set method', () => {
        expect(cache.set).toHaveBeenCalledWith(testKey, testValue, testTtl);
      });

      test('the value of this key should be defined', () => {
        expect(cache.get(testKey)).toEqual(testValue);
      });
    });
  });

  describe('delete', () => {
    describe('should delete a value from cache', () => {
      beforeEach(async () => {
        await service.set(testKey, testValue, testTtl);
        await service.delete(testKey);
      });

      test('it should call cache delete method', () => {
        expect(cache.del).toHaveBeenCalledWith(testKey);
      });

      test('the value of this key should be undefined', () => {
        expect(cache.get(testKey)).toBeUndefined();
      });
    });
  });
});
