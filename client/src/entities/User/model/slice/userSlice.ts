import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { User } from "../..";

interface InitialState {
  user: User | null;
}

const initialState: InitialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { actions: userActions } = userSlice;
export const { reducer: userReducer } = userSlice;
