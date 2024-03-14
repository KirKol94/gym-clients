export type IUser = {
  id: number
  email: string
  password: string
  firstName: string
  lastName: string
  middleName?: string | null
  avatarImg?: string | null
}

// из типа IUser достаём следующие поля для определения в типе
export type RegisterInputData = Pick<IUser, 'email' | 'password' | 'firstName' | 'lastName' | 'middleName'>

// из типа RegisterInputData достаём поля email | password и определяем их в следующем типе
export type LoginInputData = Pick<RegisterInputData, 'email' | 'password'>
