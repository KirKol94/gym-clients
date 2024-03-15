import { rtkApi } from '@/shared/api/rtkApi'

import type { ReqRegisterData, ResRegisterData } from '../model/types/register'

const registerApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    sendRegisterData: build.mutation<ResRegisterData, ReqRegisterData>({
      query: (body) => ({
        method: 'post',
        url: 'auth/register',
        body,
      }),
    }),
  }),
})

export const useSendRegisterData = registerApi.useSendRegisterDataMutation
