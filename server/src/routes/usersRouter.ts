import { Router } from 'express'
import { check } from 'express-validator'

import { UserController } from '../controllers/UserController'

export const authRouter = (): Router => {
  const router = Router()

  router.get('/all', UserController.findAll)

  router.post(
    '/register',
    [
      check('email', 'email не может быть пустым').notEmpty(),
      check('password', 'password должен быть от 6 до 16 символов').isLength({ min: 6, max: 16 }),
      check('firstName', 'firstName не может быть пустым').notEmpty(),
      check('lastName', 'lastName не может быть пустым').notEmpty(),
    ],
    UserController.registerUser,
  )

  router.post('/login', UserController.loginUser)

  return router
}
