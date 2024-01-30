import { User } from '@/entities/User'

export enum AuthType {
  LOGIN = 'login',
  REGISTER = 'register',
}

export interface AuthUserData {
  email: string
  password: string
}

export type RegisterData = AuthUserData & Omit<User, 'id'>
