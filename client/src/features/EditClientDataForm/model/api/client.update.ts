import type { IClient } from '@/entities/Client'
import { rtkApi } from '@/shared/api/rtkApi'

const clientUpdateApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    updateClientData: build.mutation<IClient, IClient>({
      query: (body) => ({
        url: 'client/update',
        method: 'put',
        body,
      }),
    }),
  }),
})

export const useUpdateClientData = clientUpdateApi.useUpdateClientDataMutation
