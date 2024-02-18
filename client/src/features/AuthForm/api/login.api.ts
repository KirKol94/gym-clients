import { rtkApi } from '@/shared/api/rtkApi'

import type { ReqAuthData, ResAuthData } from '../model/types/auth'

const authApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    sendAuthData: build.mutation<ResAuthData, ReqAuthData>({
      query: (body) => ({
        url: 'user/login',
        method: 'post',
        body,
      }),
    }),
  }),
})

export const useSendAuthData = authApi.useSendAuthDataMutation
