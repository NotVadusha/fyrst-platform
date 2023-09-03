import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Payment } from './entities/payment.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Timecard } from '../timecard/entities/timecard.entity';
import { User } from '../user/entities/user.entity';
import { Op } from 'sequelize';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment)
    private readonly paymentModel: typeof Payment,
  ) {}

  async findOneById(id: number) {
    const payment = await this.paymentModel.findOne({
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
          ],
          attributes: ['id'],
        },
      ],
    });
    if (!payment) throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    return payment;
  }

  async findAll(userId?: number, minDate?: Date, maxDate?: Date) {
    const where: any = {};

    if (!!userId) where['$timecard.employee.id$'] = userId;

    if (!!minDate || !!maxDate) {
      where.createdAt = {};

      if (minDate) {
        where.createdAt[Op.gte] = minDate;
      }

      if (maxDate) {
        where.createdAt[Op.lte] = maxDate;
      }
    }

    return await this.paymentModel.findAll({
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
          ],
          attributes: ['id'],
        },
      ],
    });
  }

  async delete(id: number) {
    const payment = await this.findOneById(id);
    if (payment) {
      await payment.destroy();
      return true;
    }
    return false;
  }

  async update(id: number, data: Partial<Payment>) {
    const payment = await this.findOneById(id);
    if (payment) {
      await payment.update(data);
      return await this.findOneById(id);
    }
    throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
  }

  async create(data: Partial<Payment>) {
    return await this.paymentModel.create(data);
  }
}
