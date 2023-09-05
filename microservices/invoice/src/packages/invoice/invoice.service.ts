import { Injectable } from '@nestjs/common';
import { InvoicePdfDto } from './dto/invoice-pdf.dto';
import { DataToPdfDto } from './dto/data-to-pdf.dto';
import { ConvertService } from '../convert/convert.service';

@Injectable()
export class InvoiceService {
  constructor(private convertService: ConvertService) {}

  async getInvoicePdfLink(data: DataToPdfDto): Promise<InvoicePdfDto> {
    this.convertService.toPdfInvoice(data);
    return {
      link: 'L',
    };
  }
}
