import { type Request, type Response, Router } from 'express'

import type { LoginInputData } from './types'

export const authRouter = (): Router => {
  const router = Router()

  //   обработка /auth/register
  router.post('/register', (req: Request, res: Response) => {
    // проверяем входные данные и если всё ок - закидываем в БД
    res.send(req.body) // а это для теста пока
  })

  //   обработка /auth/login
  router.post('/login', (req: Request<Empty, Empty, LoginInputData>, res: Response) => {
    const { email, password } = req.body
    // проверяем входные данные и если всё ок - отправляем JWT
    res.send({ email, password })
  })

  return router
}
