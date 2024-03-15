export const authType = {
  login: 'login',
  register: 'register',
} as const

export interface ReqAuthData {
  email: string
  password: string
}

export type ResAuthData = { token: string }
