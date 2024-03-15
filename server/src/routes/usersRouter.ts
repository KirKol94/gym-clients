import { Router } from 'express'
import { check } from 'express-validator'

import { UserController } from '../controllers/UserController'
import { checkHeaderAuthorization } from '../middlewares/checkHeaderAuthorization'

export const usersRouter = (): Router => {
  const router = Router()

  router.use(checkHeaderAuthorization)

  router.get('/all', UserController.findAll)

  return router
}
