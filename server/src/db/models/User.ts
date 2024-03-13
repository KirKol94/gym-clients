//* мб надо добавить allowNull: false ко всем полям, и в общем на тс

import { Model, Sequelize } from 'sequelize'

module.exports = (sequelize: Sequelize, type: any) => {
  //* чекал в доках какой тип у DataTypes, и у модели но так и не понял, проситте(
  return sequelize.define('user', {
    email: type.STRING,
    firstName: type.STRING,
    lastName: type.STRING,
    middleName: type.STRING,
    password: type.STRING,
    userName: type.STRING,
  })
}
