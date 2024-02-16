import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage/accessTokenKey'

import type { IProfileData } from '../..'

import { initialState } from './initialState'

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state) => {
      state.isAuth = true
    },
    setProfileData: (state, action: PayloadAction<IProfileData>) => {
      state.profileData = action.payload
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
