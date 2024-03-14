import { type Request, type Response, Router } from 'express'

import type { LoginInputData, RegisterInputData } from './types'

export const authRouter = (): Router => {
  const router = Router()

  //  TODO  обработка /auth/register
  router.post(
    '/register',
    (req: Request<Empty, RegisterInputData, RegisterInputData>, res: Response<RegisterInputData>) => {
      const { email, password, firstName, lastName, middleName } = req.body
      // проверяем входные данные и если всё ок - закидываем в БД
      res.status(201).json({ email, password, firstName, lastName, middleName }) // а это для теста пока
    },
  )

  //   TODO обработка /auth/login
  router.post('/login', (req: Request<Empty, LoginInputData, LoginInputData>, res: Response<LoginInputData>) => {
    const { email, password } = req.body
    // проверяем входные данные и если всё ок - отправляем JWT
    res.send({ email, password })
  })

  return router
}
