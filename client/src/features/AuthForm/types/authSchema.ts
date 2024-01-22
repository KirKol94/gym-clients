import { User } from "@/entities/User";

export enum AuthFormType {
  LOGIN = "login",
  REGISTER = "register",
}

export interface AuthSchema {
  user: User;
  email: string;
  isLoading: boolean;
  accessToken: string;
  error?: string;
}
