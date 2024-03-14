import type { Request, Response } from 'express'

import { User } from '../db'
import type { IUser, LoginInputData, RegisterInputData } from '../types/IUser'
// TODO эти данные клиент сможет получать только будучи авторизованными
export const UserController = {
  findAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.findAll()
      res.json({ users })
    } catch (err) {
      res.status(400).json({ message: (err as Error).message })
    }
  },

  registerUser: async (
    req: Request<Empty, MessageJSON, RegisterInputData>,
    res: Response<MessageJSON>,
  ): Promise<void> => {
    try {
      const [newUser, created]: [unknown, boolean] = await User.findOrCreate({
        where: {
          email: req.body.email,
        },
        defaults: req.body,
      })
      if (!created) {
        throw new Error('Пользователь с таким email уже существует')
      }
      res.status(201).json({ message: `Пользователь с логином ${(newUser as IUser).email} создан` })
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  },

  // TODO обработать функцию логина
  loginUser: async (req: Request<Empty, Empty, LoginInputData>, res: Response) => {
    try {
      res.json({ message: 'ok' })
    } catch (err) {
      res.json({ message: (err as Error).message })
    }
  },
}
