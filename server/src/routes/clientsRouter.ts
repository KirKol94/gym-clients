import { Router } from 'express'

import { ClientController } from '../controllers/ClientController'
import { checkHeaderAuthorization } from '../middlewares/checkHeaderAuthorization'

export const clientsRouter = (): Router => {
  const router = Router()

  router.use(checkHeaderAuthorization)

  router.post('/', ClientController.create)

  router.get('/', ClientController.findAll)

  router.get('/:id', ClientController.findById)

  return router
}
