import { Injectable } from '@nestjs/common';
import { InvoicePdfDto } from './dto/invoice-pdf.dto';
import { DataToPdfDto } from './dto/data-to-pdf.dto';

@Injectable()
export class InvoiceService {
  async getInvoicePdfLink(data: DataToPdfDto): Promise<InvoicePdfDto> {
    console.log(data);
    return {
      link: 'L',
    };
  }
}
