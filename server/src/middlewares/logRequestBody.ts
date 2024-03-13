import colors from 'colors'
import type { NextFunction, Request, Response } from 'express'

export const logRequestBody = (req: Request, res: Response, next: NextFunction) => {
  /** выводим в консоль тело каждого post запроса */
  if (req.method === 'POST') {
    console.log(colors.bgBlue.white(JSON.stringify(req.body, null, '  ')))
  }

  next()
}
