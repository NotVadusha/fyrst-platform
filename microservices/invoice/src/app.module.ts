import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './packages';
import { ConvertModule } from './packages/convert/convert.module';
import { GotenbergClientModule } from './packages/gotenberg-client/gotenberg-client.module';

@Module({
  imports: [InvoiceModule, ConvertModule, GotenbergClientModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
