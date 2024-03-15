import { compareSync, hashSync } from 'bcrypt'
import type { Request, Response } from 'express'
import type { Result, ValidationError } from 'express-validator'

import { HttpStatusCodes } from '../const/HttpStatusCodes'
import { User } from '../db'
import type { LoginInputData, RegisterInputData } from '../types/IUser'
import { generateAccessToken } from '../utils/generateAccessToken'

type ResMsgs = MessageJSON | Result<ValidationError>

export const UserController = {
  findAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.findAll()
      res.json(users)
    } catch (err) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message })
    }
  },

  registerUser: async (req: Request<Empty, ResMsgs, RegisterInputData>, res: Response<ResMsgs>): Promise<void> => {
    const { password } = req.body
    const hashedPassword = hashSync(password, 7)

    try {
      const [newUser, created] = await User.findOrCreate({
        where: {
          email: req.body.email,
        },
        defaults: {
          ...req.body,
          password: hashedPassword,
        },
      })

      if (!created) {
        throw new Error('Пользователь с таким email уже существует')
      }
      res.status(HttpStatusCodes.CREATED).json({ message: `Пользователь с логином ${newUser.email} создан` })
    } catch (error) {
      res.status(HttpStatusCodes.CONFLICT).json({ error: (error as Error).message })
    }
  },

  loginUser: async (req: Request<Empty, ResMsgs, LoginInputData>, res: Response<ResMsgs>) => {
    const { email, password } = req.body

    try {
      const foundedUser = await User.findOne({
        where: {
          email,
        },
      })

      const validatedPassword = foundedUser && compareSync(password, foundedUser.password)

      const token = foundedUser?.id && generateAccessToken({ id: foundedUser.id, email: foundedUser.email })

      if (!validatedPassword) {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({ error: 'Email или пароль не верно' })
        return
      }

      res.json({ token: token ? token : 'ошибка авторизации' })
    } catch (err) {
      res.json({ error: (err as Error).message })
    }
  },
}
