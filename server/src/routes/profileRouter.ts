import { existsSync, mkdir, writeFile } from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

import { type Request, type Response, Router } from 'express'

import { UserController } from '../controllers/UserController'
import { checkHeaderAuthorization } from '../middlewares/checkHeaderAuthorization'

export const profilesRouter = (): Router => {
  const router = Router()

  router.use(checkHeaderAuthorization)

  router.get('/', UserController.getProfile)

  router.put('/img', async (req: Request, res: Response) => {
    const writeFileAsync = promisify(writeFile)
    const mkdirAsync = promisify(mkdir)

    try {
      const imageData = req.body.avatarFileData
      const decodedImage = Buffer.from(imageData, 'base64')
      const imageName = `image_${req.body.firstName}_${req.body.lastName}.jpeg`
      const imagePath = resolve(__dirname, '..', '..', 'images', imageName)

      const imagesDir = resolve(__dirname, '..', '..', 'images')
      if (!existsSync(imagesDir)) {
        await mkdirAsync(imagesDir)
      }

      await writeFileAsync(imagePath, decodedImage)
      console.log('Изображение сохранено: ' + imageName)
      res.send('Изображение успешно сохранено')
    } catch (error) {
      console.error(error)
    }
  })

  router.put('/update', UserController.updateProfile)

  return router
}
