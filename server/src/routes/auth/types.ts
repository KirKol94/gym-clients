import { type IUser } from '../../types/IUser'

// из типа IUser достаём следующие поля для определения в типе
export type RegisterInputData = Pick<IUser, 'email' | 'password' | 'firstName' | 'lastName' | 'middleName'>

// из типа RegisterInputData достаём поля email | password и определяем их в следующем типе
export type LoginInputData = Pick<RegisterInputData, 'email' | 'password'>
