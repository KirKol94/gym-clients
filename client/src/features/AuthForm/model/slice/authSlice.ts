import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
   error: string;
   isLoading: boolean;
   email: string;
   password: string;
}

const initialState: InitialState = {
   isLoading: false,
   error: "",
   email: "",
   password: "",
};

const authSlice = createSlice({
   name: "auth",
   initialState,
   reducers: {},
});

export const { actions: authActions } = authSlice
export const { reducer: authReducer } = authSlice