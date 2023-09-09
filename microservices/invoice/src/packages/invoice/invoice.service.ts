import { Injectable } from '@nestjs/common';
import { DataToPdfDto } from './dto/data-to-pdf.dto';
import { ConvertService } from '../convert/convert.service';
import { PdfResponseDto } from 'shared/packages/invoice/PdfResponseDto';

@Injectable()
export class InvoiceService {
  constructor(private convertService: ConvertService) {}

  async getInvoicePdfLink(data: DataToPdfDto): Promise<PdfResponseDto> {
    return {
      pdf: await this.convertService.toPdfInvoice(data),
    };
  }
}
