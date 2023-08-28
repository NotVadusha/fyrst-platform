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
    const invoiceHTML = this.hbsTemplate(data);
    const pdfStream = await this.gotenbergClientService.createPdfFromHtml(invoiceHTML);
    pdfStream.pipe(fs.createWriteStream('src/packages/convert/pdfs/1.pdf'));
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
