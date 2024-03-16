import { DataTypes, Model } from 'sequelize'

import { sequelize } from '..'
import type { IClient } from '../../types/IClient'

export class ClientModel extends Model<IClient> {
  declare id: number
  declare email: string
  declare firstName: string
  declare lastName: string
  declare middleName: string
  declare birthday: string
  declare personalTraningCount: number
  declare mobilePhone: string
  declare sex: number
}

ClientModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: DataTypes.STRING,

    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    middleName: DataTypes.STRING,

    birthday: DataTypes.STRING,

    personalTraningCount: DataTypes.INTEGER,

    mobilePhone: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    sex: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'client' },
)
