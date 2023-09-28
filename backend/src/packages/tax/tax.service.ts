import { Injectable, NotFoundException } from '@nestjs/common';
import { Tax } from './entities/tax.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTaxDto } from './dto/create-tax.dto';

@Injectable()
export class TaxService {
  constructor(
    @InjectModel(Tax)
    private readonly taxRepository: typeof Tax,
  ) {}

  async findOneById(id: number) {
    const tax = await this.taxRepository.findByPk(id);
    if (!tax) throw new NotFoundException('Tax not found');
    return tax;
  }

  async createTax(data: CreateTaxDto): Promise<Tax> {
    return await this.taxRepository.create(data);
  }

  async findAllTaxesByPaymentId(paymentId: number): Promise<Tax[]> {
    return await this.taxRepository.findAll({
      where: {
        paymentId,
      },
    });
  }

  async updateTax(id: number, data: Partial<CreateTaxDto>): Promise<Tax> {
    const tax = await this.findOneById(id);
    return await tax.update(data);
  }

  async deleteTax(id: number): Promise<boolean> {
    try {
      const tax = await this.findOneById(id);
      await tax.destroy();
      return true;
    } catch {
      return false;
    }
  }
}
