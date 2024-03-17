import type { Request } from 'express'
import type { JwtPayload } from 'jsonwebtoken'
import { sign, verify } from 'jsonwebtoken'

import { SECRET_KEY } from '../const/SECRET_KEY'

export const JWT = {
  generate: (payload: Record<string, string | number>) => {
    return sign(payload, SECRET_KEY, { expiresIn: '24h' })
  },

  decode: (req: Request): string | JwtPayload | { id: number; email: string } => {
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
  },
}
