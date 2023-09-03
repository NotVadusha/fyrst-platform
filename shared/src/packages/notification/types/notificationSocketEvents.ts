import { Notification } from './notification';

export interface ServerToClientEvents {
  notificationCreated: (payload: Notification) => void;
  notificationIsRead: (payload: Notification) => void;
}
