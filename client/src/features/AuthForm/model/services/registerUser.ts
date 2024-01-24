import { createAsyncThunk } from "@reduxjs/toolkit";

import { BASE_API_URL } from "@/shared/const/api/baseApiUrl";

import { RegisterData } from "../types/auth";

type ResponseAuthToken = string;

export const fetchRegisterUser = createAsyncThunk<
   ResponseAuthToken,
   RegisterData
>("auth/fetchRegisterUser", async (registerData, thunkApi) => {
   const { rejectWithValue } = thunkApi;

   try {
      const res = await fetch(BASE_API_URL + "/register", {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(registerData),
      });

      const resUserData = await res.json();
      return resUserData.accessToken;
   } catch (error: unknown) {
      return rejectWithValue(
         "При регистрации возникла ошибка, " + (error as Error).message
      );
   }
});
