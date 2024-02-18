import { rtkApi } from '@/shared/api/rtkApi'

import type { IProfileData } from '../..'

const profileApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileData: build.query<IProfileData, void>({
      query: () => ({
        url: 'user/profile',
      }),
    }),
    updateProfileData: build.mutation<
      IProfileData,
      Pick<IProfileData, 'id' | 'firstName' | 'middleName' | 'lastName' | 'email'>
    >({
      query: (body) => ({
        url: 'user/update',
        method: 'put',
        body,
      }),
    }),
    sendAvatar: build.mutation({
      query: (body) => ({
        url: 'user/update',
        method: 'put',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),
  }),
})

export const useUpdateProfileData = profileApi.useUpdateProfileDataMutation
export const useGetProfileData = profileApi.useGetProfileDataQuery
export const useSendAvatar = profileApi.useSendAvatarMutation
