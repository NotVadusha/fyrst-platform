import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import { GotenbergClientService } from '../gotenberg-client/gotenberg-client.service';
import { DataToPdfDto } from '../invoice/dto/data-to-pdf.dto';
import { streamToBase64 } from 'src/helpers/streamToBase64';

@Injectable()
export class ConvertService implements OnModuleInit {
  constructor(private gotenbergClientService: GotenbergClientService) {}

  private readonly templateFile = 'src/packages/convert/templates/invoice.hbs';
  private hbsTemplate: HandlebarsTemplateDelegate;

  async toPdfInvoice(data: DataToPdfDto) {
    const invoiceHTML = this.hbsTemplate({
      ...data,
      date: new Date(data.invoice.createdAt).toLocaleDateString(),
    });
    const pdfStream = await this.gotenbergClientService.createPdfFromHtml(invoiceHTML);
    const pdfBase64: string = await streamToBase64(pdfStream);
    return pdfBase64;
  }

  async onModuleInit(): Promise<void> {
    this.initTemplate();
    this.registerHelpers();
  }

  private async initTemplate(): Promise<void> {
    const data = await fs.promises.readFile(this.templateFile, 'utf-8');
    const hbsTemplate = Handlebars.compile(data, { noEscape: true });
    this.hbsTemplate = hbsTemplate;
  }

  private async registerHelpers(): Promise<void> {
    Handlebars.registerHelper('countTax', (amount, tax) => ((amount / 100) * tax).toFixed(2));
    Handlebars.registerHelper('countAmountTotal', (amount, tax) =>
      (amount + (amount / 100) * tax).toFixed(2),
    );
  }
}
