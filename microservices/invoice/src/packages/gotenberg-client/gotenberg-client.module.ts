import { Module } from '@nestjs/common';
import { GotenbergClientService } from './gotenberg-client.service';

@Module({
  providers: [GotenbergClientService],
  exports: [GotenbergClientService],
})
export class GotenbergClientModule {}
