import type { IClient } from '@/entities/Client'
import { rtkApi } from '@/shared/api/rtkApi'

const clientsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllClients: build.query<IClient[], void>({
      query: () => ({
        url: 'client/find/all',
      }),
    }),
    getFoundedClientsByName: build.query<IClient[], string>({
      query: (name) => ({
        url: `client/find?name=${name}`,
      }),
    }),
  }),
})

export const useGetAllClients = clientsApi.useGetAllClientsQuery
export const useGetFoundedClientsByName = clientsApi.useGetFoundedClientsByNameQuery
