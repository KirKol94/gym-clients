import type { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

import { HttpStatusCodes } from '../const/HttpStatusCodes'
import { SECRET_KEY } from '../const/SECRET_KEY'

export const checkHeaderAuthorization = (req: Request, res: Response, next: NextFunction) => {
  // пропускаем метод опшенс
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    /**
     * приходит токен вида
     * Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbjJAZXhhbXBsZS5jb20iLCJpYXQiOjE3MTA0OTM3MDYsImV4cCI6MTcxMDU4MDEwNn0.ANIUIioaeWvL5RZ2wE3Pqet4vGdWphduY8NK_PtOBsc
     * забираем вторую часть, после пробела
     */
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new Error('Требуется авторизация')
    }

    const decodedData = verify(token, SECRET_KEY)
    /**
     * возвращается либо строка либо JwtPayload
     * строка нас не интересует (значит токен плохой)
     */
    if (typeof decodedData === 'string') {
      throw new Error('Токен не валидный')
    }
    next()
  } catch (error) {
    return res.status(HttpStatusCodes.UNAUTHORIZED).json({ error: (error as Error).message })
  }
}
