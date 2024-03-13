const { Sequelize, DataTypes } = require('sequelize')
const sqlite3 = require('sqlite3').verbose()

const UserModel = require('./models/User')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.db',
})

const User = UserModel(sequelize, DataTypes)

sequelize.sync()

module.exports = {
  User,
}
