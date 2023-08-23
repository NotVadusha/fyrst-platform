import { CACHE_MANAGER } from '@nestjs/cache-manager';

const cache = new Map([
  ['string@gmail.com', 'rty'],
  ['1', 'r-e-f-r-e-s-h'],
  ['1_r', 't-o-k-e-n-r'],
]);

export const cacheMock = {
  get: jest.fn().mockImplementation((key: string) => {
    return cache.get(key);
  }),
  set: jest.fn().mockImplementation((key: string, value: string, ttl: number) => {
    cache.set(key, value);
  }),
  del: jest.fn().mockImplementation((key: string) => {
    cache.delete(key);
  }),
};

export const cacheProvider = {
  provide: CACHE_MANAGER,
  useValue: cacheMock,
};

export const existingKey = 'string@gmail.com';
export const nonEexistingKey = '123';

export const testKey = 'testKey';
export const testValue = 'testValue';
export const testTtl = 300;

export const redisServiceMock = {
  get: jest.fn().mockImplementation((key: string) => {
    return cache.get(key);
  }),
  set: jest.fn().mockImplementation((key: string, value: string, ttl: number) => {
    cache.set(key, value);
  }),
  delete: jest.fn().mockImplementation((key: string) => {
    cache.delete(key);
  }),
};
