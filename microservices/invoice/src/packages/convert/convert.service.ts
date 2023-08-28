import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as Handlebars from 'handlebars';
import { GotenbergClientService } from '../gotenberg-client/gotenberg-client.service';

@Injectable()
export class ConvertService implements OnModuleInit {
  constructor(private gotenbergClientService: GotenbergClientService) {}

  private readonly templateFile = 'src/packages/convert/templates/invoice.hbs';
  private hbsTemplate: HandlebarsTemplateDelegate;

  async toPdfInvoice<T>(data: T) {
    const invoiceHTML = this.hbsTemplate({ ...data, date: new Date().toLocaleDateString() });
    const pdfStream = await this.gotenbergClientService.createPdfFromHtml(invoiceHTML);
    pdfStream.pipe(fs.createWriteStream('src/packages/convert/pdfs/1.pdf'));
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
    Handlebars.registerHelper('countAmount', (hours, price) => (hours * price).toFixed(2));
    Handlebars.registerHelper('countTax', (hours, price, tax) =>
      (((hours * price) / 100) * tax).toFixed(2),
    );
    Handlebars.registerHelper('countAmountTotal', (hours, price, tax) =>
      (hours * price + ((hours * price) / 100) * tax).toFixed(2),
    );
  }
}
