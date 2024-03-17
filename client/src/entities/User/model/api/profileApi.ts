import { rtkApi } from '@/shared/api/rtkApi'

import type { IProfileData } from '../..'

const profileApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileData: build.query<IProfileData, void>({
      query: () => ({
        url: 'profile',
      }),
    }),

    updateProfileData: build.mutation<
      IProfileData,
      Pick<IProfileData, 'firstName' | 'middleName' | 'lastName' | 'email'>
    >({
      query: (body) => ({
        url: 'profile/update',
        method: 'put',
        body,
      }),
    }),

    sendAvatar: build.mutation({
      query: (body) => ({
        url: '/profile/img',
        method: 'put',
        body,
        headers: {
          'Content-Type': 'application/json',
        },
      }),
    }),

    removeAvatar: build.mutation({
      query: (id) => ({
        url: `/profile/img/${id}`,
        method: 'delete',
      }),
    }),
  }),
})

export const useUpdateProfileData = profileApi.useUpdateProfileDataMutation
export const useGetProfileData = profileApi.useGetProfileDataQuery
export const useSendAvatar = profileApi.useSendAvatarMutation
export const useRemoveAvatar = profileApi.useRemoveAvatarMutation
