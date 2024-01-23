import { RootState } from "@/app/store";

export const getUSer = (state: RootState) => state.user.user;
