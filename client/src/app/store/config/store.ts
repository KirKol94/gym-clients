import { combineReducers,configureStore } from "@reduxjs/toolkit";

import { authFormReducer } from "@/features/AuthForm";

const rootReducer = combineReducers({
   authForm: authFormReducer,
});

export const store = configureStore({
   reducer: rootReducer
});
