import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { userReducer } from '@/entities/User'
import { authReducer } from '@/features/AuthForm'

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})
