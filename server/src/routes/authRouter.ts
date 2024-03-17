import { Router } from 'express'
import { check } from 'express-validator'

import { AuthController } from '../controllers/authController'
import { validateInput } from '../middlewares/validateInput'

export const authRouter = (): Router => {
  const router = Router()

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
    ],
    validateInput,
    AuthController.registerUser,
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
    validateInput,
    AuthController.loginUser,
  )

  return router
}
