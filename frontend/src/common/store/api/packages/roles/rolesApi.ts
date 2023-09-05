import { apiSlice } from '../../api';
import { Role } from 'src/common/packages/roles/types/models/Role.model';

const rolesApi = apiSlice.injectEndpoints({
  endpoints(builder) {
    return {
      fetchRoles: builder.query<Role[], void>({
        query() {
          return '/role';
        },
      }),
    };
  },
});

export const { useFetchRolesQuery } = rolesApi;
