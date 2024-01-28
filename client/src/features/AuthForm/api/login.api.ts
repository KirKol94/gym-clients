import { rtkApi } from '@/shared/api/rtkApi'

import { AuthUserData } from '../model/types/auth'

const authApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    sendAuthData: build.mutation({
      query: (body: AuthUserData) => ({
        url: 'login',
        method: 'post',
        body,
      }),
    }),
  }),
})

export const useSendAuthData = authApi.useSendAuthDataMutation
