import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from 'src/packages/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AccessTokenStrategy } from './strategies/access-token.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { RedisModule } from 'src/packages/redis/redis.module';
import { EmailConfirmationModule } from 'src/packages/email-confirmation/emailConfirmation.module';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AccessTokenStrategy,
    GoogleStrategy,
    {
      provide: 'INVOICE_SERVICE',
      useFactory() {
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [process.env.RABBITMQ_URL],
            queue: 'invoice_queue',
            queueOptions: {
              durable: false,
            },
          },
        });
      },
    },
  ],
  imports: [
    UserModule,
    RedisModule,
    EmailConfirmationModule,
    JwtModule.register({
      secret: process.env.JWT_ACCESS_SECRET || 'JWT_ACCESS_SECRET',
      signOptions: {
        expiresIn: process.env.JWT_ACCESS_EXPIRATION_TIME || '1m',
      },
    }),
  ],
})
export class AuthModule {}
