import type { RootState } from '@/app/store'

export const getIsAuth = (state: RootState) => state.user.isAuth
