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
      check('password', 'пароль должен быть от 6 до 16 символов и не должен содержать пробелов')
        .isLength({ min: 6, max: 16 })
        .not()
        .contains(' '),
      check('firstName', 'имя должно быть не менее 2 и не более 20 символов').isLength({ min: 2, max: 20 }),
      check('lastName', 'фамилия должна быть не менее 2 и не более 24 символов').isLength({ min: 2, max: 24 }),
      check('middleName', 'отчество должно быть не менее 6 и не более 24 символов').isLength({ min: 2, max: 24 }),
    ],
    UserController.registerUser,
  )

  router.post(
    '/login',
    [
      check('email', 'Не корректный email').isEmail(),
      check('password', 'пароль должен быть от 6 до 16 символов и не должен содержать пробелов')
        .isLength({ min: 6, max: 16 })
        .not()
        .contains(' '),
    ],
    UserController.loginUser,
  )

  return router
}
