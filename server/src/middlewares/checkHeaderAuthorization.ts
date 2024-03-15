import type { NextFunction, Request, Response } from 'express'

import { HttpStatusCodes } from '../const/HttpStatusCodes'

export const checkHeaderAuthorization = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    next()
  } else {
    res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: 'требуется авторизация' })
  }
}
