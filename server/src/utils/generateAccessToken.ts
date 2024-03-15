import { sign } from 'jsonwebtoken'

import { SECRET_KEY } from '../const/SECRET_KEY'

export const generateAccessToken = (payload: Record<string, string | number>) => {
  return sign(payload, SECRET_KEY, { expiresIn: '24h' })
}
