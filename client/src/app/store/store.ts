import { combineReducers, configureStore } from "@reduxjs/toolkit";

import { userReducer } from "@/entities/User";
import { authFormReducer } from "@/features/AuthForm";

const rootReducer = combineReducers({
   user: userReducer,
   authForm: authFormReducer,
});

export const store = configureStore({
   reducer: rootReducer,
});
