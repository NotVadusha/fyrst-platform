import { Notification } from './notification';

export interface ServerToClientEvents {
  connection: (payload: string) => void;
  createNotification: (payload: Notification) => void;
  notificationIsRead: (payload: Notification) => void;
}

export interface ClientToServerEvents {
  mapping: (payload: { userId: number }) => void;
}
