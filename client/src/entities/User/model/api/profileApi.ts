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
    updateProfileData: build.mutation<
      ResGetProfileType,
      Pick<ResGetProfileType, 'id' | 'firstName' | 'middleName' | 'lastName' | 'email'>
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
