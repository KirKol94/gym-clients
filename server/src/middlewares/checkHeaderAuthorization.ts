import type { NextFunction, Request, Response } from 'express'

export const checkHeaderAuthorization = (req: Request, res: Response, next: NextFunction) => {
  if (req.headers.authorization) {
    next()
  } else {
    res.status(400).json({ message: 'требуется авторизация' })
  }
}
