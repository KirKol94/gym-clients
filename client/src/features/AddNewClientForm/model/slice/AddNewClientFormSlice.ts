import { createSlice } from '@reduxjs/toolkit'
  
  interface InitialState {
  
  }
  
  const initialState: InitialState = {
    
  }
  
  const addNewClientFormSlice = createSlice({
    name: 'addNewClientForm'',
    initialState,
    reducers: {
      
    },
  })
  
  export const { actions: addNewClientFormActions } = addNewClientFormSlice
  export const { reducer: addNewClientFormReducer } = addNewClientFormSlice