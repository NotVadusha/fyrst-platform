import { apiSlice } from '../../api';
import { Tax } from 'src/common/packages/tax/types/models/Tax.model';

export const taxApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getTaxes: build.query<Tax[], number>({
      query: id => `/tax/${id}`,
    }),
  }),
});
