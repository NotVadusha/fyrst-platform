import { Global, Module } from '@nestjs/common';
import { UserService } from 'src/packages/user/user.service';
@Global()
@Module({
  providers: [
    {
      provide: UserService,
      useValue: {},
    },
  ],
  exports: [UserService],
})
export class UserModuleMock {}
