export enum AuthType {
  LOGIN = 'login',
  REGISTER = 'register',
}

export interface ReqAuthData {
  username: string
  password: string
}

export type ResAuthData = { Token: string }
