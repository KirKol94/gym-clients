import { Router } from 'express'
import { check } from 'express-validator'

import { UserController } from '../controllers/UserController'

export const usersRouter = (): Router => {
  const router = Router()

  router.get('/all', UserController.findAll)

  return router
}
