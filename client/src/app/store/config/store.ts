import { combineReducers, configureStore } from '@reduxjs/toolkit'

import { userReducer } from '@/entities/User'
import { clientsReducer } from '@/features/ClientList'
import { rtkApi } from '@/shared/api/rtkApi'

const rootReducer = combineReducers({
  user: userReducer,
  clients: clientsReducer,
  [rtkApi.reducerPath]: rtkApi.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(rtkApi.middleware),
})
