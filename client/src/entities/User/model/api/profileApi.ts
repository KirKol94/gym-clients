import { rtkApi } from '@/shared/api/rtkApi'

import { IResGetProfileType } from '../..'

const profileApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileData: build.query<IResGetProfileType, void>({
      query: () => ({
        url: 'user/profile',
      }),
    }),
    updateProfileData: build.mutation<
      IResGetProfileType,
      Pick<IResGetProfileType, 'id' | 'firstName' | 'middleName' | 'lastName' | 'email'>
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
