import { Invoice } from '../entities/invoice.entity';

export class AllInvoicesDto {
  invoices: Invoice[];
  total: number;
}
