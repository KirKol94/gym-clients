import { createAsyncThunk } from "@reduxjs/toolkit";

import { User, userActions } from "@/entities/User";
import { BASE_API_URL } from "@/shared/const/api/baseApiUrl";
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage/accessTokenKey";
import { IS_AUTH_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage/isAuthKey";
import { USER_LOCAL_STORAGE_KEY } from "@/shared/const/localStorage/userKey";

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

      if (res.status !== 200) {
         throw new Error("Произошла ошибка при авторизации");
      }

      localStorage.setItem(
         USER_LOCAL_STORAGE_KEY,
         JSON.stringify(resUserData.user)
      );

      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, JSON.stringify(resUserData.accessToken));

      localStorage.setItem(IS_AUTH_LOCAL_STORAGE_KEY, JSON.stringify(true));

      dispatch(userActions.setUser(resUserData.user));
      return resUserData;
   } catch (error: unknown) {
      return rejectWithValue(
         "Авторизация прошла с ошибкой, " + (error as Error).message
      );
   }
});
