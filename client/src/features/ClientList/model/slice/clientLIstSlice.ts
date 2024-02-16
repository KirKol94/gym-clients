import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { IClient } from '@/entities/Client'

import { initialState } from './initialState'

const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setClients: (state, action: PayloadAction<IClient[]>) => {
      state.clients = action.payload
    },
    addNewClient: (state, action: PayloadAction<IClient>) => {
      state.clients.push(action.payload)
    },
  },
})

export const { actions: clientsActions } = clientsSlice
export const { reducer: clientsReducer } = clientsSlice
