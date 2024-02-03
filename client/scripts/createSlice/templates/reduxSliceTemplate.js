import firstCharLowerCase from '../firstCharLowerCase.js'

export default (sliceName) => {
  return `import { createSlice } from '@reduxjs/toolkit'
  
  interface InitialState {
  
  }
  
  const initialState: InitialState = {
    
  }
  
  const ${firstCharLowerCase(sliceName)}Slice = createSlice({
    name: '${firstCharLowerCase(sliceName)}'',
    initialState,
    reducers: {
      
    },
  })
  
  export const { actions: ${firstCharLowerCase(sliceName)}Actions } = ${firstCharLowerCase(sliceName)}Slice
  export const { reducer: ${firstCharLowerCase(sliceName)}Reducer } = ${firstCharLowerCase(sliceName)}Slice`
}
