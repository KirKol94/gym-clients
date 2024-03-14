import colors from 'colors'

import { User } from '../db'
import type { IUser } from '../types/IUser'

User.sync({ force: true })

export const UserController = {
  findAll: async () => {
    const users = await User.findAll()
    console.log(colors.bgYellow.black(JSON.stringify(users, null, 2)))
  },
  // TODO вынести этот тип отсюда и из authRouter в IUser.ts
  saveUser: async (user: Pick<IUser, 'email' | 'password' | 'firstName' | 'lastName' | 'middleName'>) => {
    try {
      const newUser = await User.create(user)
      console.log('Новый пользователь успешно добавлен:', newUser.toJSON())
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error)
    }
  },
}
