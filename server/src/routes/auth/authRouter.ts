import { Router } from 'express'

import { UserController } from '../../controllers/UserController'

export const authRouter = (): Router => {
  const router = Router()

  router.get('/', UserController.findAll)

  router.post('/register', UserController.registerUser)

  router.post('/login', UserController.loginUser)

  return router
}
