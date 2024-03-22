import { rtkApi } from '@/shared/api/rtkApi'

import type { IClient } from '../..'

const clientApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getClientData: build.query<IClient, string | undefined>({
      query: (id) => ({
        url: `clients/${id}`,
      }),
    }),
  }),
})

export const useGetClientData = clientApi.useGetClientDataQuery
