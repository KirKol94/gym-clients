import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { IS_AUTH_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage/isAuthKey'
import { USER_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage/userKey'

import { User } from '../..'

interface InitialState {
  isAuth: boolean
  user: User | null
}

const initialState: InitialState = {
  isAuth: false,
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.isAuth = true
    },
    initAuthData: (state) => {
      const isAuth = localStorage.getItem(IS_AUTH_LOCAL_STORAGE_KEY)
      const user = localStorage.getItem(USER_LOCAL_STORAGE_KEY)

      if (isAuth && user) {
        state.isAuth = JSON.parse(isAuth)
        state.user = JSON.parse(user)
      }
    },
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
