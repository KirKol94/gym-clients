import type { NextFunction, Request, Response } from 'express'

import { HttpStatusCodes } from '../const/HttpStatusCodes'
import { JWT } from '../utils/JWT'

export const checkHeaderAuthorization = (req: Request, res: Response, next: NextFunction) => {
  // пропускаем метод опшенс
  if (req.method === 'OPTIONS') {
    next()
  }

  try {
    const decodedData = JWT.decode(req)
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
