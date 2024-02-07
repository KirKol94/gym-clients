import { createSlice } from '@reduxjs/toolkit'

import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage/accessTokenKey'

interface InitialState {
  isAuth: boolean
}

const initialState: InitialState = {
  isAuth: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state) => {
      state.isAuth = true
    },
    initAuthData: (state) => {
      const accessToken = localStorage.getItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY)

      if (accessToken) {
        state.isAuth = true
      }
    },
    logOut: (state) => {
      state.isAuth = false
    },
  },
})

export const { actions: userActions } = userSlice
export const { reducer: userReducer } = userSlice
