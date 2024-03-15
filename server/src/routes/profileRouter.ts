import { Router } from 'express'

import { UserController } from '../controllers/UserController'
import { checkHeaderAuthorization } from '../middlewares/checkHeaderAuthorization'

export const profilesRouter = (): Router => {
  const router = Router()

  router.use(checkHeaderAuthorization)

  router.get('/', UserController.getProfile)

  return router
}
