import { sign } from 'jsonwebtoken'

import { getSecretKey } from '../const'

export const generateAccessToken = (payload: Record<string, string>) => {
  return sign(payload, getSecretKey(), { expiresIn: '24h' })
}
