import { type Request, type Response, Router } from 'express'

import type { LoginInputData, RegisterInputData } from './types'
import { UserController } from '../../controllers/UserController'

export const authRouter = (): Router => {
  const router = Router()

  router.get('/', async (req: Request, res: Response) => {
    const users = await UserController.findAll()
    console.log(users)
    res.json(users)
  })

  //  TODO  обработка /auth/register
  router.post(
    '/register',
    (req: Request<Empty, RegisterInputData, RegisterInputData>, res: Response<RegisterInputData>) => {
      const { email, password, firstName, lastName, middleName } = req.body
      // проверяем входные данные и если всё ок - закидываем в БД
      UserController.saveUser(req.body)
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
