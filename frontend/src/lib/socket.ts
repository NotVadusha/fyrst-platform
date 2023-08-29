import { Socket, io } from 'socket.io-client';
import { ClientToServerEvents, ServerToClientEvents } from 'shared/socketEvents';

const SERVER = 'http://localhost:8000/';

console.log(process.env.NODE_ENV);

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(SERVER, {
  transports: ['websocket'],
});
