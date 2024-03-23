import { createSlice } from '@reduxjs/toolkit'

interface InitialState {}

const initialState: InitialState = {}

const themeSwitcherSlice = createSlice({
  name: 'themeSwitcher',
  initialState,
  reducers: {},
})

export const { actions: themeSwitcherActions } = themeSwitcherSlice
export const { reducer: themeSwitcherReducer } = themeSwitcherSlice
