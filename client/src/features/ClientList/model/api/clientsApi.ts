import { IClient } from '@/entities/Client'
import { rtkApi } from '@/shared/api/rtkApi'

const clientsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllClients: build.query<IClient[], void>({
      query: () => ({
        url: 'client/find/all',
      }),
    }),
  }),
})

export const useGetAllClients = clientsApi.useGetAllClientsQuery
