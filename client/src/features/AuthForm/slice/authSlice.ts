import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthSchema } from "../types/authSchema";
import { User } from "@/entities/User";
import { authByEmail, registerByUserData } from "../services/loginByEmail";

const initialState: AuthSchema = {
  user: {
    password: "",
    email: "",
    name: "",
    surname: "",
    patronymic: "",
  },
  isLoading: false,
  email: "",
  accessToken: "",
  error: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserAuthData: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authByEmail.pending, (state) => {
        state.error = "";
        state.accessToken = "";
        state.isLoading = true;
      })
      .addCase(authByEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(authByEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(registerByUserData.pending, (state) => {
        state.error = "";
        state.accessToken = "";
        state.isLoading = true;
      })
      .addCase(registerByUserData.fulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
        state.user = action.payload.user;
        state.isLoading = false;
      })
      .addCase(registerByUserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { actions: authActions } = authSlice;
export const { reducer: authReducer } = authSlice;
