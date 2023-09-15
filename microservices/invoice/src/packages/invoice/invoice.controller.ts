import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InvoiceService } from './invoice.service';
import { DataToPdfDto } from './dto/data-to-pdf.dto';
import { PdfResponseDto } from 'shared/packages/invoice/PdfResponseDto';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @EventPattern('get_invoice_pdf_link')
  async getInvoicePdf(data: DataToPdfDto): Promise<PdfResponseDto> {
    return await this.invoiceService.getInvoicePdfLink(data);
  }
}
