import type { Request, Response } from 'express'

import { HttpStatusCodes } from '../const/HttpStatusCodes'
import { ClientModel as Client } from '../db/models/ClientModel'
import type { IClient } from '../types/IClient'

export const ClientController = {
  findAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const clients = await Client.findAll()
      res.json(clients)
    } catch (err) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message })
    }
  },

  findById: async (req: Request<{ id: number }>, res: Response) => {
    try {
      const client = await Client.findOne({
        where: {
          id: req.params.id,
        },
        attributes: {
          exclude: ['createdAt', 'updatedAt'],
        },
      })
      if (!client) {
        throw new Error('Клиент не найден')
      }
      res.send(client)
    } catch (error) {
      res.send((error as Error).message)
    }
  },

  create: async (req: Request<Empty, Empty, IClient>, res: Response) => {
    try {
      const client = await Client.create(req.body)
      res.status(HttpStatusCodes.CREATED).send(client)
    } catch (err) {
      res.status(HttpStatusCodes.CONFLICT).json({ error: (err as Error).message })
    }
  },

  update: async (req: Request<{ id: number }, Empty, IClient>, res: Response) => {
    try {
      await Client.update(req.body, { where: { id: req.params.id } })
      const client = await Client.findByPk(req.params.id)
      res.send(client)
    } catch (error) {
      res.send(error)
    }
  },
}
