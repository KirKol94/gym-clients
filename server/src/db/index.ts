import { Sequelize } from 'sequelize'

import { UserModel } from './models/UserModel'

export const sequelize = new Sequelize('sqlite:database.db')

export const User = UserModel(sequelize)

sequelize.sync({ alter: true })
