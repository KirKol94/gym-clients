import { Sequelize } from 'sequelize'

import { UserModel } from './models/UserModel'

const sequelize = new Sequelize('sqlite:database.db')

const user = UserModel(sequelize)

user.sync()
sequelize.sync({ force: true })
