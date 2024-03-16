import type { Request, Response } from 'express'

import { HttpStatusCodes } from '../const/HttpStatusCodes'
import { ClientModel as Client } from '../db/models/ClientModel'

export const ClientController = {
  findAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const clients = await Client.findAll()
      res.json(clients)
    } catch (err) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message })
    }
  },
  createClient: async (req: Request, res: Response): Promise<void> => {
    try {
      const [newClient, created] = await Client.findOrCreate({
        where: {
          mobilePhone: req.body.mobilePhone,
        },
        defaults: {
          ...req.body,
        },
      })

      if (!created) {
        throw new Error('Клиент с таким номером телефона уже существует')
      }
      res.status(HttpStatusCodes.CREATED).json({ message: `Клиент с номером телефона ${newClient.mobilePhone} создан` })
    } catch (err) {
      res.status(HttpStatusCodes.CONFLICT).json({ error: (err as Error).message })
    }
  },
}
