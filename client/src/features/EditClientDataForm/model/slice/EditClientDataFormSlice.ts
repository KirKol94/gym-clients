import { createSlice } from '@reduxjs/toolkit'

interface InitialState {}

const initialState: InitialState = {}

const editClientDataFormSlice = createSlice({
  name: 'editClientDataForm',
  initialState,
  reducers: {},
})

export const { actions: editClientDataFormActions } = editClientDataFormSlice
export const { reducer: editClientDataFormReducer } = editClientDataFormSlice
