import { Module } from '@nestjs/common';
import { ConvertService } from './convert.service';
import { GotenbergClientModule } from '..';

@Module({
  providers: [ConvertService],
  exports: [ConvertService],
  imports: [GotenbergClientModule],
})
export class ConvertModule {}
