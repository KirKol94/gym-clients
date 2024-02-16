import type { RootState } from '@/app/store'

export const getProfileData = (state: RootState) => state.user.profileData
