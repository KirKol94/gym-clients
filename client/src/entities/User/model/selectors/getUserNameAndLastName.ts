import { RootState } from '@/app/store'

export const getUserNameAndLastName = (state: RootState) =>
  `${state.user.profileData.firstName} ${state.user.profileData.middleName}`
