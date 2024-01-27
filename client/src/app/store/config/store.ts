import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { userReducer } from '@/entities/User'
import { authReducer } from '@/features/AuthForm'
import { rtkApi } from '@/shared/api/rtkApi'

const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
  [rtkApi.reducerPath]: rtkApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(rtkApi.middleware),
})
