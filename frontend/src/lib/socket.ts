import { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from 'shared/socketEvents';

const SERVER = 'http://localhost:8001/';

const token = localStorage.getItem('accessToken');

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SERVER, {
  transports: ['websocket'],
  // query: { token: localStorage.getItem('accessToken') },
});
