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
  saveUser: async (
    user: Pick<IUser, 'email' | 'password' | 'firstName' | 'lastName' | 'middleName'>,
  ): Promise<void> => {
    try {
      const [newUser, created] = await User.findOrCreate({
        where: {
          email: user.email,
        },
        defaults: user,
      })
      if (created) {
        console.log('Новый пользователь успешно добавлен:', newUser.toJSON())
      } else {
        throw new Error('Пользователь уже зарегистрирован')
      }
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error)
    }
  },
}
