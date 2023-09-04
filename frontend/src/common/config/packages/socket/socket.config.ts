import * as React from 'react';
import { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from 'shared/socketEvents';

const SERVER = process.env.REACT_APP_WSS_URL!;

const accessToken = localStorage.getItem('accessToken');

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SERVER, {
  transports: ['websocket'],
  extraHeaders: {
    Authorization: `Bearer ${accessToken}`,
  },
});

export const SocketContext = React.createContext(socket);
