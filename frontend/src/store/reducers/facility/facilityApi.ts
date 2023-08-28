import { Facility } from 'types/models/Facility';
import { apiSlice } from '../apiSlice';

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
