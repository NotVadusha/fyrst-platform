import { ProfileDto } from 'src/common/packages/user/common/user-profile/types/dto/ProfileDto';
import { apiSlice } from '../../api';
import { UpdateProfileDto } from 'src/common/packages/user/common/user-profile/types/dto/UpdateProfileDto';
import { Payment } from 'src/common/packages/payments/types/models/Payment.model';
import { GetAllPaymentsDto } from 'src/common/packages/payments/types/dto/GetAllPayments.dto';
import { PaymentsFiltersDto } from 'src/common/packages/payments/types/dto/PaymentsFilters.dto';

export const paymentsApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getAllPayments: build.query<GetAllPaymentsDto, PaymentsFiltersDto>({
      query: params => {
        const paramsString = new URLSearchParams();
        Object.entries(params).map(param => paramsString.set(param[0], param[1]));
        return `/payment?${paramsString}`;
      },
    }),
    getPayment: build.query<Payment, number>({
      query: id => ({
        url: `/payment/${id}`,
      }),
    }),
  }),
});
