import { apiSlice } from '../../api';
import { Payment } from 'src/common/packages/payments/types/models/Payment.model';
import { GetAllPaymentsDto } from 'src/common/packages/payments/types/dto/GetAllPaymentsDto';
import { PaymentsFiltersDto } from 'src/common/packages/payments/types/dto/PaymentsFiltersDto';
import { UpdatePaymentDto } from 'src/common/packages/payments/types/dto/UpdatePaymentDto';

export const paymentsApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllPayments: build.query<GetAllPaymentsDto, PaymentsFiltersDto>({
      query: params => {
        const paramsString = new URLSearchParams();
        Object.entries(params).map(param => paramsString.set(param[0], param[1]));
        return `/payment?${paramsString}`;
      },
      providesTags: ['Payments'],
    }),
    getPayment: build.query<Payment, number>({
      query: id => ({
        url: `/payment/${id}`,
      }),
      providesTags: ['Payment'],
    }),
    updatePayment: build.mutation<Payment, UpdatePaymentDto>({
      query: ({ id, body }) => ({
        url: `/payment/${id}`,
        body,
        method: 'PATCH',
      }),
      invalidatesTags: ['Payment'],
    }),
  }),
});
