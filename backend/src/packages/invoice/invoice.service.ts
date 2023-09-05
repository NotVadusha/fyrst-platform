import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Invoice } from './entities/invoice.entity';
import { Timecard } from '../timecard/entities/timecard.entity';
import { User } from '../user/entities/user.entity';
import { Op } from 'sequelize';
import { Booking } from '../booking/entities/booking.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoicesFiltersDto } from './dto/invoices-filters.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice)
    private readonly invoiceRepository: typeof Invoice,
    private userService: UserService,
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

  async findAll(filters: InvoicesFiltersDto, id: number) {
    const user = await this.userService.findOne(id);

    const where: any = {};

    if (user.role_id === 1) where['$timecard.employee.id$'] = user.id;
    else if (user.role_id === 2) {
      where['$timecard.booking.createdBy$'] = user.id;
      if (!!filters.payee) {
        where['$timecard.employee.id$'] = filters.payee;
      }
    } else if (user.role_id === 3 && !!filters.payee) {
      where['$timecard.employee.id$'] = filters.payee;
    }

    if (!!filters.minDate || !!filters.maxDate) {
      where.createdAt = {};

      if (filters.minDate) {
        where.createdAt[Op.gte] = filters.minDate;
      }

      if (filters.maxDate) {
        where.createdAt[Op.lte] = filters.maxDate;
      }
    }

    const invoices = await this.invoiceRepository.findAll({
      where,
      limit: filters.limit,
      offset: filters.offset,
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

    const total = await this.invoiceRepository.count({
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

    return {
      invoices,
      total,
    };
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
