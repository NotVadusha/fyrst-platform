import { Socket, io } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "shared/socketEvents";

const SERVER = process.env.REACT_APP_API_URL!;

console.log(process.env.NODE_ENV)

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  SERVER,
  { transports: ["websocket"] }
);