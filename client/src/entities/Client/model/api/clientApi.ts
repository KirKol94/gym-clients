import { rtkApi } from '@/shared/api/rtkApi'

import { IClient } from '../..'

const clientApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getClientData: build.query<IClient, void>({
      query: (id) => ({
        url: `client/find/${id}`,
      }),
    }),
  }),
})

export const useGetClientData = clientApi.useGetClientDataQuery
