import { type Request, type Response, Router } from 'express'

import type { Empty } from '../types/Empty'

type LoginInputData = {
  login: string
  password: string
}

export const authRouter = (): Router => {
  const router = Router()

  //   обработка /auth/register
  router.post('/register', (req: Request, res: Response) => {
    // проверяем входные данные и если всё ок - закидываем в БД
    res.send(req.body) // а это для теста пока
  })

  //   обработка /auth/login
  router.post('/login', (req: Request<Empty, Empty, LoginInputData>, res: Response) => {
    const { login, password } = req.body
    // проверяем входные данные и если всё ок - отправляем JWT
    res.send({ login, password })
  })

  return router
}
