import { compareSync, hashSync } from 'bcrypt'
import type { Request, Response } from 'express'
import type { Result, ValidationError } from 'express-validator'
import { validationResult } from 'express-validator'
import { sign } from 'jsonwebtoken'

import { User } from '../db'
import type { IUser, LoginInputData, RegisterInputData } from '../types/IUser'

type ResMsgs = MessageJSON | Result<ValidationError>

const generateAccessToken = (id: number, email: string) => {
  const payload = {
    id,
    email,
  }
  return sign(payload, process.env.SECRET_KEY)
}

export const UserController = {
  // TODO эти данные клиент сможет получать только будучи авторизованными
  findAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const users = await User.findAll()
      res.json({ users })
    } catch (err) {
      res.status(400).json({ message: (err as Error).message })
    }
  },

  registerUser: async (req: Request<Empty, ResMsgs, RegisterInputData>, res: Response<ResMsgs>): Promise<void> => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(400).json(errors)
      return
    }

    const { password } = req.body
    const hashedPassword = hashSync(password, 7)
    try {
      const [newUser, created]: [unknown, boolean] = await User.findOrCreate({
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
      res.status(201).json({ message: `Пользователь с логином ${(newUser as IUser).email} создан` })
    } catch (error) {
      res.status(400).json({ message: (error as Error).message })
    }
  },

  // TODO обработать функцию логина
  loginUser: async (req: Request<Empty, ResMsgs, LoginInputData>, res: Response<ResMsgs>) => {
    const errors = validationResult(req)
    const { email, password } = req.body
    if (!errors.isEmpty()) {
      res.status(400).json(errors)
      return
    }

    try {
      const foundedUser: unknown = await User.findOne({
        where: {
          email,
        },
      })
      const validatedPassword = compareSync(password, (foundedUser as IUser).password)
      if (!validatedPassword) {
        res.status(400).json({ message: 'Email или пароль не верно' })
      }
      const token = generateAccessToken((foundedUser as IUser).id, (foundedUser as IUser).email)
      res.json({ message: token })
    } catch (err) {
      res.json({ message: (err as Error).message })
    }
  },
}
