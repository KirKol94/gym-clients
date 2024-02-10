import { rtkApi } from '@/shared/api/rtkApi'

type ResGetProfileType = {
  id: number
  firstName: string
  middleName: string
  lastName: string
  username: string
  email: string
  avatar: string
  accountNonExpired: boolean
  accountNonLocked: boolean
  credentialsNonExpired: boolean
  roles: [
    {
      id: number
      roleName: string
    },
  ]
  enabled: boolean
}

const profileApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getProfileData: build.query<ResGetProfileType, void>({
      query: () => ({
        url: 'user/profile',
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

export const useGetProfileData = profileApi.useGetProfileDataQuery
export const useSendAvatar = profileApi.useSendAvatarMutation
