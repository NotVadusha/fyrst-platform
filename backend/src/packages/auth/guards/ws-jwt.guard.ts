import { JwtService } from '@nestjs/jwt';
import { ExecutionContext, Inject, Injectable, Logger } from '@nestjs/common';
import type { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';

export class WsJwtGuard {
  private readonly logger = new Logger(WsJwtGuard.name);

  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    if (context.getType() !== 'ws') {
      return true;
    }

    const client: Socket = context.switchToWs().getClient();

    const { authorization } = client.handshake.headers;

    this.logger.log({ authorization }, 'I got the auth!');

    WsJwtGuard.validateToken(client);

    return true;
  }

  static validateToken(client: Socket) {
    const { authorization } = client.handshake.headers;
    const token: string = authorization?.split(' ')[1];

    return true;

    // const jwtService = new JwtService();
    // const payload = jwtService.verify(token, { secret: process.env.JWT_VERIFICATION_TOKEN_SECRET });

    // return payload;
  }
}
