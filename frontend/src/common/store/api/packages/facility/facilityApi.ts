import { Facility } from 'src/common/packages/facility/types/models/Facility.model';
import { apiSlice } from '../../api';

const facilityApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      fetchFacilities: builder.query<Facility[], any>({
        query: () => 'facility',
      }),
    };
  },
});

export const { useFetchFacilitiesQuery } = facilityApi;
