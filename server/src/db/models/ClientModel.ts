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
  declare personalTrainingCount: number
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

    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },

    firstName: DataTypes.STRING,

    lastName: DataTypes.STRING,

    middleName: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    birthday: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    personalTrainingCount: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    mobilePhone: {
      type: DataTypes.STRING,
      unique: true,
    },

    sex: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  { sequelize, modelName: 'client' },
)
