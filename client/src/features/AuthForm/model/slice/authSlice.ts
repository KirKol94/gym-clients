import { createSlice } from "@reduxjs/toolkit";

import { fetchAuthUser } from "../services/authUser";
import { fetchRegisterUser } from "../services/registerUser";

interface InitialState {
   error: string;
   isLoading: boolean;
}

const initialState: InitialState = {
   isLoading: false,
   error: "",
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder
         .addCase(fetchAuthUser.pending, (state) => {
            state.error = "";
            state.isLoading = true;
         })
         .addCase(fetchAuthUser.fulfilled, (state) => {
            state.error = "";
            state.isLoading = false;
         })
         .addCase(fetchAuthUser.rejected, (state, action) => {
            state.error = action.payload as string;
            state.isLoading = false;
         })
         .addCase(fetchRegisterUser.pending, (state) => {
            state.error = "";
            state.isLoading = true;
         })
         .addCase(fetchRegisterUser.fulfilled, (state) => {
            state.error = "";
            state.isLoading = false;
         })
         .addCase(fetchRegisterUser.rejected, (state, action) => {
            state.error = action.payload as string;
            state.isLoading = false;
         });
   },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
