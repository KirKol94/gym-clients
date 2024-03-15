import { sign } from 'jsonwebtoken'

export const generateAccessToken = (payload: Record<string, string>) => {
  return sign(payload, SECRET_KEY, { expiresIn: '24h' })
}
