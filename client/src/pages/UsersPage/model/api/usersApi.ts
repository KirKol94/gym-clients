import type { User } from '@/entities/User'
import { rtkApi } from '@/shared/api/rtkApi'

type ResUsersData = User & { id: number }

const usersApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<ResUsersData[], void>({
      query: () => ({
        url: 'users',
      }),
    }),
  }),
})

export const useGetUsers = usersApi.useGetUsersQuery
