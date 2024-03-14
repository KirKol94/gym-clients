import { Sequelize } from 'sequelize'

import { UserModel } from './models/UserModel'
import type { IUser } from '../types/IUser'

const sequelize = new Sequelize('sqlite:database.db')

const User = UserModel(sequelize)

User.sync({ force: true })

const createUser = async (user: Pick<IUser, 'email' | 'password' | 'firstName' | 'lastName' | 'middleName'>) => {
  try {
    const newUser = await User.create(user)
    console.log('Новый пользователь успешно добавлен:', newUser.toJSON())
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error)
  }
}

const newUser: Pick<IUser, 'email' | 'password' | 'firstName' | 'lastName' | 'middleName'> = {
  email: 'kirkol94@ya.ru',
  password: 'qwerty123456',
  firstName: 'kirill',
  lastName: 'kolchanov',
  middleName: 'olegovich',
}
createUser(newUser)
