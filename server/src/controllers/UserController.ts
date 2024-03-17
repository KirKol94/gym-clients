import type { Request, Response } from 'express'

import { HttpStatusCodes } from '../const/HttpStatusCodes'
import { User } from '../db'

export const UserController = {
  findAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      })
      res.json(users)
    } catch (err) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message })
    }
  },
}
