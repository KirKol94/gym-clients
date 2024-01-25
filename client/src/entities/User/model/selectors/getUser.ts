import { RootState } from '@/app/store'

export const getUserData = (state: RootState) => state.user.user
