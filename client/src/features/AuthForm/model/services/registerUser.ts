import { createAsyncThunk } from "@reduxjs/toolkit";

import { User } from "@/entities/User";
import { BASE_API_URL } from "@/shared/const/api/baseApiUrl";

import { RegisterData } from "../types/auth";

interface ResponseAuthUseData {
   accessToken: string;
   user: User;
}

export const fetchRegisterUser = createAsyncThunk<
   ResponseAuthUseData,
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
      return resUserData;
   } catch (error: unknown) {
      return rejectWithValue(
         "При регистрации возникла ошибка, " + (error as Error).message
      );
   }
});
