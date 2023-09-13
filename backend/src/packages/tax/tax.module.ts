import { Module } from '@nestjs/common';
import { TaxService } from './tax.service';
import { TaxController } from './tax.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Tax } from './entities/tax.entity';

@Module({
  imports: [SequelizeModule.forFeature([Tax])],
  providers: [TaxService],
  controllers: [TaxController],
  exports: [TaxService],
})
export class TaxModule {}
