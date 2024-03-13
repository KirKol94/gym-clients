//* мб надо добавить allowNull: false ко всем полям, и в общем на тс

import { type Sequelize, DataTypes as type } from 'sequelize'

export const UserModel = (sequelize: Sequelize) => {
  return sequelize.define('user', {
    email: type.STRING,
    firstName: type.STRING,
    lastName: type.STRING,
    middleName: type.STRING,
    password: type.STRING,
    userName: type.STRING,
  })
}
