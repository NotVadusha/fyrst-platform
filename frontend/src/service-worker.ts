/// <reference lib="webworker" />
/* eslint-disable no-restricted-globals */

import { clientsClaim } from 'workbox-core';
import { ExpirationPlugin } from 'workbox-expiration';
import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkOnly, NetworkFirst } from 'workbox-strategies';

self.__WB_DISABLE_DEV_LOGS = true;

declare const self: ServiceWorkerGlobalScope;

clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

const fileExtensionRegexp = new RegExp('/[^/?]+\\.[^/]+$');
registerRoute(({ request, url }: { request: Request; url: URL }) => {
  if (request.mode !== 'navigate') return false;
  if (url.pathname.startsWith('/_')) return false;
  if (url.pathname.match(fileExtensionRegexp)) return false;
  return true;
}, createHandlerBoundToURL(process.env.PUBLIC_URL + '/index.html'));

registerRoute(
  ({ url }) =>
    url.origin === self.location.origin &&
    (url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.jpg') ||
      url.pathname.endsWith('.jpeg') ||
      url.pathname.endsWith('.svg')),
  new StaleWhileRevalidate({
    cacheName: 'images',
    plugins: [new ExpirationPlugin({ maxEntries: 100, maxAgeSeconds: 30 * 24 * 60 * 60 })],
  }),
);

registerRoute(({ url, request }) => {
  return (
    url.pathname.startsWith('/api/v1/auth/') ||
    url.pathname.startsWith('/api/v1/email-confirmation/') ||
    url.pathname.startsWith('/api/v1/reset-password/') ||
    request.method === 'POST' ||
    request.method === 'DELETE' ||
    request.method === 'PATCH'
  );
}, new NetworkOnly());

const API_MODULES = [
  'role',
  'user',
  'profile',
  'timecard',
  'booking',
  'facility',
  'chat',
  'message',
  'payment',
  'invoice',
  'calendar-events',
  'statistics',
];

API_MODULES.forEach(module => {
  registerRoute(
    ({ url }) =>
      url.origin === self.location.origin && url.pathname.startsWith(`/api/v1/${module}`),
    new NetworkFirst({
      cacheName: `api-${module}`,
      plugins: [new ExpirationPlugin({ maxEntries: 1000, maxAgeSeconds: 24 * 60 * 60 })],
    }),
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

self.addEventListener('activate', event => {
  const cacheWhitelist = ['images', ...API_MODULES.map(module => `api-${module}`)];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        }),
      );
    }),
  );
});
