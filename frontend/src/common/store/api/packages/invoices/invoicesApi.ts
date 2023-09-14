import { apiSlice } from '../../api';
import { InvoicesFiltersDto } from 'src/common/packages/invoices/types/dto/InvoicesFiltersDto';
import { GetAllInvoicesDto } from 'src/common/packages/invoices/types/dto/GetAllInvoicesDto';
import { Invoice } from 'src/common/packages/invoices/types/models/Invoice.model';
import { InvoicePdfDto } from 'src/common/packages/invoices/types/dto/InvoicePdfDto';
import { InvoiceBase64Dto } from 'src/common/packages/invoices/types/dto/InvoiceBase64Dto';

export const invoicesApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllInvoices: build.query<GetAllInvoicesDto, InvoicesFiltersDto>({
      query: params => {
        const paramsString = new URLSearchParams();
        Object.entries(params).map(param => paramsString.set(param[0], param[1]));
        return `/invoice?${paramsString}`;
      },
    }),
    getInvoice: build.query<Invoice, number>({
      query: id => ({
        url: `/invoice/${id}`,
      }),
    }),
    getPdfLink: build.query<InvoicePdfDto, number>({
      query: id => ({
        url: `/invoice/${id}/pdf`,
      }),
    }),
    getPdfBase64: build.query<InvoiceBase64Dto, number>({
      query: id => ({
        url: `/invoice/${id}/base64`,
      }),
    }),
  }),
});
