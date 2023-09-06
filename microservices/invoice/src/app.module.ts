import { Module } from '@nestjs/common';
import { InvoiceModule } from './packages';
import { ConvertModule } from './packages/convert/convert.module';
import { GotenbergClientModule } from './packages/gotenberg-client/gotenberg-client.module';

@Module({
  imports: [InvoiceModule, ConvertModule, GotenbergClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
