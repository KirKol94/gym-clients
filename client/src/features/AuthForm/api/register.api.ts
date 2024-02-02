import { rtkApi } from '@/shared/api/rtkApi'

import { ReqRegisterData, ResRegisterData } from '../model/types/register'

const registerApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    sendRegisterData: build.mutation<ResRegisterData, ReqRegisterData>({
      query: (body) => ({
        method: 'post',
        url: 'register',
        body,
      }),
    }),
  }),
})

export const useSendRegisterData = registerApi.useSendRegisterDataMutation
