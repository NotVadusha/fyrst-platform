import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import { GotenbergClientService } from '../gotenberg-client/gotenberg-client.service';
import { DataToPdfDto } from '../invoice/dto/data-to-pdf.dto';
import { streamToBase64 } from 'src/helpers/streamToBase64';
import { getTotal } from 'shared/getTotal';
import { getTotalTax } from 'shared/getTotalTax';

@Injectable()
export class ConvertService implements OnModuleInit {
  constructor(private gotenbergClientService: GotenbergClientService) {}

  private readonly templateFile = 'src/packages/convert/templates/invoice.hbs';
  private hbsTemplate: HandlebarsTemplateDelegate;

  async toPdfInvoice(data: DataToPdfDto) {
    const totalTax = getTotalTax(data.invoice.timecard.payment.taxes);

    const total = getTotal(totalTax, data.invoice.amountPaid);
    let totalRate = `${totalTax.percentage}%`;
    if (totalTax.additionalAmount) totalRate += ` + $${totalTax.additionalAmount.toFixed(2)}`;

    const invoiceHTML = this.hbsTemplate({
      ...data,
      invoiceDate: new Date(data.invoice.createdAt).toLocaleDateString(),
      paymentDate: new Date(data.invoice.timecard.payment.createdAt).toLocaleDateString(),
      total: Math.round(total * 100) / 100,
      totalRate: `Tax ${totalRate}:`,
      tax: Math.round((total - data.invoice.amountPaid) * 100) / 100,
    });
    const pdfStream = await this.gotenbergClientService.createPdfFromHtml(invoiceHTML);
    const pdfBase64: string = await streamToBase64(pdfStream);
    return pdfBase64;
  }

  async onModuleInit(): Promise<void> {
    this.initTemplate();
  }

  private async initTemplate(): Promise<void> {
    const data = await fs.promises.readFile(this.templateFile, 'utf-8');
    const hbsTemplate = Handlebars.compile(data, { noEscape: true });
    this.hbsTemplate = hbsTemplate;
  }
}
