import { rtkApi } from '@/shared/api/rtkApi'

import { ReqAuthData, ResAuthData } from '../model/types/auth'

const authApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    sendAuthData: build.mutation<ResAuthData, ReqAuthData>({
      query: (body) => ({
        url: 'gettoken',
        method: 'post',
        body,
      }),
    }),
  }),
})

export const useSendAuthData = authApi.useSendAuthDataMutation
