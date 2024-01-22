import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserData } from "../types/types";

interface InitialState {
   userData: UserData;
}

const initialState: InitialState = {
   userData: {
      email: "",
      password: "",
      name: "",
      surname: "",
      patronymic: "",
   },
};

const authFormSlice = createSlice({
   name: "authForm",
   initialState,
   reducers: {
      setAuthData: (state, action: PayloadAction<UserData>) => {
         state.userData = action.payload;
      },
   },
});

export const { actions: authFormActions } = authFormSlice;
export const { reducer: authFormReducer } = authFormSlice;
