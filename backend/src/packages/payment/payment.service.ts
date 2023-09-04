import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Payment } from './entities/payment.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Timecard } from '../timecard/entities/timecard.entity';
import { User } from '../user/entities/user.entity';
import { Op } from 'sequelize';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { UserProfile } from '../user-profile/entities/user-profile.entity';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @InjectModel(Payment)
    private readonly paymentRepository: typeof Payment,
  ) {}

  async findOneById(id: number) {
    const payment = await this.paymentRepository.findOne({
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

  async findOneByPaymentId(id: string) {
    const payment = await this.paymentRepository.findOne({
      where: { stripePaymentId: id },
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

    return await this.paymentRepository.findAll({
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

  async updateByPaymentId(paymentId: string, data: Partial<Payment>) {
    try {
      const payment = await this.paymentRepository.findOne({
        where: {
          stripePaymentId: paymentId,
        },
      });
      if (payment) {
        await payment.update(data);
        return await this.paymentRepository.findOne({
          where: {
            stripePaymentId: paymentId,
          },
        });
      }
      throw new HttpException('Payment not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      this.logger.error('Error:', error.response || error);
      if (error instanceof HttpException) throw error;
      throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: CreatePaymentDto) {
    return await this.paymentRepository.create(data);
  }
}
