export const authType = {
  login: 'login',
  register: 'register',
} as const

export interface ReqAuthData {
  username: string
  password: string
}

export type ResAuthData = { Token: string }
