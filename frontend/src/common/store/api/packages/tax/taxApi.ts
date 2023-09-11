import { apiSlice } from '../../api';
import { Payment } from 'src/common/packages/payments/types/models/Payment.model';
import { GetAllPaymentsDto } from 'src/common/packages/payments/types/dto/GetAllPaymentsDto';
import { PaymentsFiltersDto } from 'src/common/packages/payments/types/dto/PaymentsFiltersDto';
import { UpdatePaymentDto } from 'src/common/packages/payments/types/dto/UpdatePaymentDto';
import { Tax } from 'src/common/packages/tax/types/models/Tax.model';

export const paymentsApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getTaxes: build.query<Tax[], number>({
      query: id => `/tax/${id}`,
    }),
  }),
});
