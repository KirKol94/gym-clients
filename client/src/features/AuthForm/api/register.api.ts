import { rtkApi } from '@/shared/api/rtkApi'

import { RegisterData } from '../model/types/auth'

const registerApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    sendRegisterData: build.mutation({
      query: (body: RegisterData) => ({
        method: 'post',
        url: 'register',
        body,
      }),
    }),
  }),
})

export const { useSendRegisterDataMutation } = registerApi
