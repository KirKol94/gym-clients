import { rtkApi } from '@/shared/api/rtkApi'

const clientsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getAllClients: build.query({
      query: () => ({
        url: 'client/find/all',
      }),
    }),
  }),
})

export const useGetAllClients = clientsApi.useGetAllClientsQuery
