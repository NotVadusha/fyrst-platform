import { Invoice } from '../models/Invoice.model';

export interface GetAllInvoicesDto {
  invoices: Invoice[];
  total: number;
}
