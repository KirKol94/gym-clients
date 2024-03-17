import { Router } from 'express'

import { ProfileController } from '../controllers/profileController'
import { checkHeaderAuthorization } from '../middlewares/checkHeaderAuthorization'

export const profilesRouter = (): Router => {
  const router = Router()

  router.get('/', [checkHeaderAuthorization], ProfileController.getProfileData)

  router.put('/update', [checkHeaderAuthorization], ProfileController.updateProfileData)

  router.get('/img/:id', ProfileController.getProfileImg)

  router.put('/img', [checkHeaderAuthorization], ProfileController.updateProfileImg)

  router.delete('/img/:id', [checkHeaderAuthorization], ProfileController.removeProfileImg)

  return router
}
