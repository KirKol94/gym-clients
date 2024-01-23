import { createAsyncThunk } from "@reduxjs/toolkit";

import { User, userActions } from "@/entities/User";
import { BASE_API_URL } from "@/shared/const/api/baseApiUrl";

import { AuthUserData } from "../types/auth";

interface ResponseAuthUseData {
   accessToken: string;
   user: User;
}

export const fetchAuthUser = createAsyncThunk<
   ResponseAuthUseData,
   AuthUserData
>("auth/fetchAuthUser", async (authData, thunkApi) => {
   const { dispatch, rejectWithValue } = thunkApi;

   try {
      const res = await fetch(BASE_API_URL + "/login", {
         method: "post",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify(authData),
      });

      const resUserData = await res.json();
      dispatch(userActions.setUser(resUserData.user));
      return resUserData
   } catch (error: unknown) {
      return rejectWithValue(
         "Авторизация прошла с ошибкой, " + (error as Error).message
      );
   }
});
