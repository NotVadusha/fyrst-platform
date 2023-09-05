import * as React from 'react';
import { Socket, io } from 'socket.io-client';
import {
  ClientToServerEvents as ChatClientToServerEvents,
  ServerToClientEvents as ChatServerToClientEvents,
} from 'shared/socketEvents';
import {
  ServerToClientEvents as NotificationServerToClientEvents,
  ClientToServerEvents as NotificationClientToServerEvents,
} from 'shared/packages/notification/types/notificationSocketEvents';

interface ServerToClientEvents extends ChatServerToClientEvents, NotificationServerToClientEvents {}
interface ClientToServerEvents extends ChatClientToServerEvents, NotificationClientToServerEvents {}

const SERVER = process.env.REACT_APP_WSS_URL!;

const accessToken = localStorage.getItem('accessToken');

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SERVER, {
  transports: ['websocket'],
  extraHeaders: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const SocketContext = React.createContext(socket);
