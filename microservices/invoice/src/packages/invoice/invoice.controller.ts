import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { InvoiceService } from './invoice.service';
import { InvoicePdfDto } from './dto/invoice-pdf.dto';
import { DataToPdfDto } from './dto/data-to-pdf.dto';

@Controller('invoice')
export class InvoiceController {
  constructor(private invoiceService: InvoiceService) {}

  @EventPattern('get_invoice_pdf_link')
  async getInvoicePdf(data: DataToPdfDto): Promise<InvoicePdfDto> {
    return await this.invoiceService.getInvoicePdfLink(data);
  }
}
