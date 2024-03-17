import { writeFile } from 'fs/promises'
import { resolve } from 'path'

import { Router } from 'express'

import { UserController } from '../controllers/UserController'
import { checkHeaderAuthorization } from '../middlewares/checkHeaderAuthorization'

export const profilesRouter = (): Router => {
  const router = Router()

  router.use(checkHeaderAuthorization)

  router.get('/', UserController.getProfile)

  router.put('/img', async (req, res) => {
    try {
      const imageData = req.body.avatarFileData
      const decodedImage = await Buffer.from(imageData, 'base64')
      const imageName = 'image_' + req.body.firstName + '_' + req.body.lastName + '.jpeg'
      const imagePath = resolve(__dirname, '..', '..', 'images', imageName)

      await writeFile(imagePath, decodedImage, (err) => {
        if (err) {
          console.error(err)
          res.status(500).send('Ошибка при сохранении изображения')
        }
        console.log('Изображение сохранено: ' + imageName)
        res.send('Изображение успешно сохранено')
      })
    } catch (error) {
      console.log(error)
      res.send(error)
    }
  })

  router.put('/update', UserController.updateProfile)

  return router
}
