import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceModule } from './packages';
import { ConvertModule } from './packages/convert/convert.module';

@Module({
  imports: [InvoiceModule, ConvertModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
