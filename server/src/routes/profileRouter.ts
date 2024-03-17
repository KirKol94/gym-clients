import { existsSync, mkdir, writeFile } from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

import { type Request, type Response, Router } from 'express'

import { HttpStatusCodes } from '../const/HttpStatusCodes'
import { UserController } from '../controllers/UserController'
import { User } from '../db'
import { checkHeaderAuthorization } from '../middlewares/checkHeaderAuthorization'

export const profilesRouter = (): Router => {
  const router = Router()

  router.get('/img/:id', async (req, res) => {
    try {
      const id = req.params.id

      const user = await User.findOne({
        where: {
          id,
        },
        attributes: { include: ['avatarImgPath'] },
      })

      if (!user?.avatarImgPath) {
        throw new Error('not image')
      }
      res.sendFile(user?.avatarImgPath)
    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
  })

  router.get('/', [checkHeaderAuthorization], UserController.getProfile)

  router.put('/img', [checkHeaderAuthorization], async (req: Request, res: Response) => {
    const writeFileAsync = promisify(writeFile)
    const mkdirAsync = promisify(mkdir)

    try {
      const imageData = req.body.avatarFileData
      const decodedImage = Buffer.from(imageData, 'base64')
      const imageName = `image_userId_${req.body.id}.jpeg`
      const imagePath = resolve(__dirname, '..', '..', 'images', imageName)

      const imagesDir = resolve(__dirname, '..', '..', 'images')
      if (!existsSync(imagesDir)) {
        await mkdirAsync(imagesDir)
      }

      await writeFileAsync(imagePath, decodedImage)

      await User.update(
        {
          avatarImgPath: imagePath,
          avatarImg: process.env.BASE_URL + process.env.PORT + '/profile/img/' + req.body.id,
        },
        {
          where: {
            id: req.body.id,
          },
        },
      )

      console.log('Изображение сохранено: ' + imageName)
      res.sendFile(imagePath)
    } catch (error) {
      console.error(error)
    }
  })

  router.delete('/img/:id', [checkHeaderAuthorization], async (req, res) => {
    try {
      const id = req.params.id

      await User.update(
        { avatarImg: null, avatarImgPath: null },
        {
          where: {
            id,
          },
        },
      )

      res.status(HttpStatusCodes.OK).send({ message: 'изображение удалено' })
    } catch (error) {
      console.log(error)
      res.send(error.message)
    }
  })

  router.put('/update', [checkHeaderAuthorization], UserController.updateProfile)

  return router
}
