import { DataTypes, Model } from 'sequelize'

import { sequelize } from '..'
import type { IClient } from '../../types/IClient'

export class ClientModel extends Model<IClient> {}

ClientModel.init(
  {
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

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    middleName: DataTypes.STRING,

    birthday: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    personalTraningCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mobilePhone: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sex: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'client' },
)
