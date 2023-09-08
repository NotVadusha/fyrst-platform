import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Invoice } from './entities/invoice.entity';
import { Timecard } from '../timecard/entities/timecard.entity';
import { User } from '../user/entities/user.entity';
import { Op } from 'sequelize';
import { Booking } from '../booking/entities/booking.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { InvoicesFiltersDto } from './dto/invoices-filters.dto';
import { UserService } from '../user/user.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { userRoles } from 'shared/packages/roles/userRoles';
import { BucketService } from '../bucket/bucket.service';
import { Facility } from '../facility/entities/facility.entity';
import { WEEK_IN_MILLISECONDS } from 'src/helpers/constants';
import { PdfResponseDto } from 'shared/packages/invoice/PdfResponseDto';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject('INVOICE_SERVICE')
    private invoiceService: ClientProxy,
    @InjectModel(Invoice)
    private readonly invoiceRepository: typeof Invoice,
    private userService: UserService,
    private bucketService: BucketService,
  ) {}

  async findOneById(id: number): Promise<Invoice> {
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
    if (!invoice) throw new NotFoundException('Invoice not found');
    return invoice;
  }

  async findAll(filters: InvoicesFiltersDto, id: number) {
    const user = await this.userService.findOne(id);

    const where: any = {};

    if (user.role_id === userRoles.WORKER) where['$timecard.employee.id$'] = user.id;
    else if (user.role_id === userRoles.FACILITY_MANAGER) {
      where['$timecard.booking.createdBy$'] = user.id;
      if (!!filters.payee) {
        where['$timecard.employee.id$'] = filters.payee;
      }
    } else if (user.role_id === userRoles.PLATFORM_ADMIN && !!filters.payee) {
      where['$timecard.employee.id$'] = filters.payee;
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
    try {
      const invoice = await this.findOneById(id);
      await invoice.destroy();
      return true;
    } catch {
      return false;
    }
  }

  async update(id: number, data: Partial<Invoice>) {
    const invoice = await this.findOneById(id);
    return await invoice.update(data);
  }

  async create(data: CreateInvoiceDto) {
    return await this.invoiceRepository.create(data);
  }

  async getInvoice(invoiceId: number) {
    const invoice = await this.invoiceRepository.findOne({
      where: {
        id: invoiceId,
      },
      include: [
        {
          model: Timecard,
          include: [
            {
              model: User,
              as: 'employee',
            },
            {
              model: Booking,
              include: [Facility],
            },
          ],
        },
      ],
    });

    if (invoice.path)
      return {
        link: await this.bucketService.getFileLink(
          invoice.path,
          'read',
          Date.now() + WEEK_IN_MILLISECONDS,
        ),
      };

    const pdfResponse: PdfResponseDto = await firstValueFrom(
      this.invoiceService.send('get_invoice_pdf_link', {
        invoice,
      }),
    );

    const pdfBuffer = Buffer.from(pdfResponse.pdf, 'base64');
    const fileName = `invoice_${invoiceId}.pdf`;

    const link = await this.bucketService.save(`pdf-files/${fileName}`, pdfBuffer);

    this.update(invoiceId, {
      path: `pdf-files/${fileName}`,
    });

    return {
      link,
    };
  }
}
