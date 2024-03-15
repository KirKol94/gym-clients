import type { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

import { HttpStatusCodes } from '../const/HttpStatusCodes'

export const validateInput = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    res.status(HttpStatusCodes.UNPROCESSABLE_ENTITY).json(errors)
  } else {
    next()
  }
}
