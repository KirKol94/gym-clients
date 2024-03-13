import { Sequelize } from 'sequelize'
import { verbose } from 'sqlite3'

import { UserModel } from './models/UserModel'

verbose()

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
})

export const User = UserModel(sequelize)

sequelize.sync()
