import { Module } from '@nestjs/common';
import { InvoiceModule, ConvertModule, GotenbergClientModule } from './packages';

@Module({
  imports: [InvoiceModule, ConvertModule, GotenbergClientModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
