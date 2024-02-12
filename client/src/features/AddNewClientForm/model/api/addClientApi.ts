import { IClient } from '@/entities/Client'
import { rtkApi } from '@/shared/api/rtkApi'

type ReqClientData = Omit<IClient, 'id'>
type ResClientData = Omit<IClient, 'birthday' | 'email' | 'mobilePhone' | 'personalTrainingCount' | 'sex'>

const newClientApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    sendClient: build.mutation<ResClientData, ReqClientData>({
      query: (body) => ({
        url: 'client/save',
        method: 'post',
        body,
      }),
    }),
  }),
})

export const useAddNewClient = newClientApi.useSendClientMutation
