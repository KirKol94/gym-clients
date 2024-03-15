import type { Model, Sequelize } from 'sequelize'
import { DataTypes } from 'sequelize'

import type { IUser } from '../../types/IUser'

export interface UserInstance extends Model<IUser>, IUser {}

export const UserModel = (sequelize: Sequelize) =>
  sequelize.define<UserInstance>('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    middleName: DataTypes.STRING,

    avatarImg: DataTypes.STRING,
  })
