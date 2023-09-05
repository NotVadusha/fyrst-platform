import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Invoice } from './entities/invoice.entity';
import { Timecard } from '../timecard/entities/timecard.entity';
import { User } from '../user/entities/user.entity';
import { Op } from 'sequelize';
import { Booking } from '../booking/entities/booking.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice)
    private readonly invoiceRepository: typeof Invoice,
  ) {}

  async findOneById(id: number) {
    const invoice = await this.invoiceRepository.findOne({
      where: { id },
      include: [
        {
          model: Timecard,
          include: [
            {
              model: User,
              attributes: ['id', 'first_name', 'last_name'],
              as: 'employee',
            },
            {
              model: Booking,
              attributes: ['id', 'startDate', 'endDate'],
            },
          ],
          attributes: ['id'],
        },
      ],
    });
    if (!invoice) throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
    return invoice;
  }

  async findAll(payeeId?: number, minDate?: Date, maxDate?: Date) {
    const where: any = {};

    if (!!payeeId) where['$timecard.employee.id$'] = payeeId;

    if (!!minDate || !!maxDate) {
      where.createdAt = {};

      if (minDate) {
        where.createdAt[Op.gte] = minDate;
      }

      if (maxDate) {
        where.createdAt[Op.lte] = maxDate;
      }
    }

    return await this.invoiceRepository.findAll({
      where,
      include: [
        {
          model: Timecard,
          include: [
            {
              model: User,
              attributes: ['id', 'first_name', 'last_name'],
              as: 'employee',
            },
            {
              model: Booking,
              attributes: ['id', 'startDate', 'endDate'],
            },
          ],
          attributes: ['id'],
        },
      ],
    });
  }

  async delete(id: number) {
    const invoice = await this.findOneById(id);
    if (invoice) {
      await invoice.destroy();
      return true;
    }
    return false;
  }

  async update(id: number, data: Partial<Invoice>) {
    const invoice = await this.findOneById(id);
    if (invoice) {
      await invoice.update(data);
      return await this.findOneById(id);
    }
    throw new HttpException('Invoice not found', HttpStatus.NOT_FOUND);
  }

  async create(data: CreateInvoiceDto) {
    return await this.invoiceRepository.create(data);
  }
}
