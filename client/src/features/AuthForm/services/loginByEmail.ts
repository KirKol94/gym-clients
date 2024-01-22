import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_API_URL } from "@/shared/const/baseApiUrl/baseApiUrl";
import { User } from "@/entities/User";

interface AuthByEmailDataProps {
  email: string;
  password: string;
}

const $api = async (
  endpoint: "/login" | "/register",
  body: AuthByEmailDataProps | User
): Promise<Response> => {
  return await fetch(BASE_API_URL + endpoint, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};

export const authByEmail = createAsyncThunk(
  "auth/authByEmail",
  async (data: AuthByEmailDataProps, { rejectWithValue }) => {
    try {
      const res = await $api("/login", data);

      if (res.status !== 200) {
        throw new Error("Ошибка при отправке данных для авторизации");
      }

      return await res.json();
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const registerByUserData = createAsyncThunk(
  "auth/registerByUserData",
  async (data: User, { rejectWithValue }) => {
    try {
      const res = await $api("/register", data);

      if (res.status !== 201) {
        throw new Error("Ошибка при регистрации нового пользователя");
      }

      return await res.json();
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
    }
  }
);
