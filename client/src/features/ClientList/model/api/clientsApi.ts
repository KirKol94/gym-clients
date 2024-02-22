import type { IClient } from '@/entities/Client'
import { rtkApi } from '@/shared/api/rtkApi'

const clientsApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getClients: build.query<IClient[], string | void>({
      query: (name) => {
        const queryParams = !name ? '/all' : `?name=${name}`
        return {
          url: `client/find${queryParams}`,
        }
      },
    }),
  }),
})

export const useGetClients = clientsApi.useGetClientsQuery
