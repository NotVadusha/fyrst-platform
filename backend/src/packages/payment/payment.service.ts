import {
  ForbiddenException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Payment } from './entities/payment.entity';
import { InjectModel } from '@nestjs/sequelize';
import { Timecard } from '../timecard/entities/timecard.entity';
import { User } from '../user/entities/user.entity';
import { Op } from 'sequelize';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentsFiltersDto } from './dto/payments-filters.dto';
import { UserService } from '../user/user.service';
import { Booking } from '../booking/entities/booking.entity';
import { userRoles } from 'shared/packages/roles/userRoles';
import { defaultTaxes } from './data/taxes';
import { TaxService } from '../tax/tax.service';
import { NotificationService } from '../notification/notification.service';
import { paymentApproveNotification } from 'shared/packages/notification/types/notificationTemplates';


@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(
    @InjectModel(Payment)
    private readonly paymentRepository: typeof Payment,
    private userService: UserService,
    private taxService: TaxService,
    private notificationService: NotificationService,
  ) {}

  async findOneById(id: number, userId: number) {
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
            {
              model: Booking,
              attributes: ['id', 'createdBy'],
            },
          ],
          attributes: ['id'],
        },
      ],
    });
    if (!payment) throw new NotFoundException('Payment not found');
    if (payment.timecard.employee.id !== userId && payment.timecard.booking.createdBy !== userId)
      throw new ForbiddenException('Access denied');
    delete payment.timecard.booking;
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
    if (!payment) throw new NotFoundException('Payment not found');
    return payment;
  }

  async findAll(filters: PaymentsFiltersDto, id: number) {
    const user = await this.userService.findOne(id);

    const where: any = {};

    if (user.role_id === userRoles.WORKER) where['$timecard.employee.id$'] = user.id;
    else if (user.role_id === userRoles.FACILITY_MANAGER) {
      where['$timecard.booking.createdBy$'] = user.id;
      if (!!filters.worker) {
        where['$timecard.employee.id$'] = filters.worker;
      }
    } else if (user.role_id === userRoles.PLATFORM_ADMIN && !!filters.worker) {
      where['$timecard.employee.id$'] = filters.worker;
    }

    if (!!filters.minDate || !!filters.maxDate) {
      where.createdAt = {};
    }

    if (filters.minDate) {
      where.createdAt[Op.gte] = filters.minDate;
    }

    if (filters.maxDate) {
      where.createdAt[Op.lte] = filters.maxDate;
    }

    const payments = await this.paymentRepository.findAll({
      where,
      limit: filters.limit,
      offset: filters.offset,
      include: [
        {
          model: Timecard,
          as: 'timecard',
          include: [
            {
              model: Booking,
              attributes: [],
            },
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

    const total = await this.paymentRepository.count({
      where,
      include: [
        {
          model: Timecard,
          as: 'timecard',
          include: [
            {
              model: Booking,
              attributes: [],
            },
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

    return { payments, total };
  }

  async delete(id: number, userId: number) {
    try {
      const payment = await this.findOneById(id, userId);
      await payment.destroy();
      return true;
    } catch {
      return false;
    }
  }

  async update(id: number, data: Partial<Payment>, userId: number) {
    const payment = await this.findOneById(id, userId);
    if (payment.approved !== data.approved)
      this.notificationService.create({
        recipientId: payment.timecard.createdBy,
        content: paymentApproveNotification(payment.timecard.booking.facility.name),
        type: 'payments',
        refId: payment.id,
      });

    return await payment.update(data);
  }

  async updateByPaymentId(paymentId: string, data: Partial<Payment>) {
    try {
      const payment = await this.paymentRepository.findOne({
        where: {
          stripePaymentId: paymentId,
        },
      });
      if (!payment) throw new NotFoundException('Payment not found');
      await payment.update(data);
      return await this.paymentRepository.findOne({
        where: {
          stripePaymentId: paymentId,
        },
      });
    } catch (error) {
      this.logger.error('Error:', error.response || error);
      if (error instanceof HttpException) throw error;
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async create(data: CreatePaymentDto) {
    const payment = await this.paymentRepository.create(data);
    defaultTaxes.forEach(
      async tax =>
        await this.taxService.createTax({
          ...tax,
          paymentId: payment.id,
        }),
    );
    return payment;
  }
}
