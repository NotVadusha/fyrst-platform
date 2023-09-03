import { Notification } from './notification';

export interface ServerToClientEvents {
  notificationNew: (payload: Notification) => void;
  notificationUpdate: (payload: Notification) => void;
}
