import type { Request } from 'express'
import { verify } from 'jsonwebtoken'

import { SECRET_KEY } from '../const/SECRET_KEY'

export const decodeToken = (req: Request) => {
  /**
   * приходит токен вида
   * Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJhZG1pbjJAZXhhbXBsZS5jb20iLCJpYXQiOjE3MTA0OTM3MDYsImV4cCI6MTcxMDU4MDEwNn0.ANIUIioaeWvL5RZ2wE3Pqet4vGdWphduY8NK_PtOBsc
   * забираем вторую часть, после пробела
   */
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    throw new Error('Требуется авторизация')
  }

  const decodedResult = verify(token, SECRET_KEY)

  return decodedResult
}
