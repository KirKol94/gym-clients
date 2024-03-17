import { existsSync, mkdir, unlink, writeFile } from 'fs'
import { resolve } from 'path'
import { promisify } from 'util'

import type { Request, Response } from 'express'

import { HttpStatusCodes } from '../const/HttpStatusCodes'
import { User } from '../db'
import type { IUser } from '../types/IUser'
import { JWT } from '../utils/JWT'

export const ProfileController = {
  getProfileData: async (req: Request, res: Response) => {
    try {
      const decodedToken = JWT.decode(req)
      if (typeof decodedToken === 'string') {
        res.status(HttpStatusCodes.UNAUTHORIZED).json({ error: 'авторизуйтесь' })
        throw new Error('Невалидный токен')
      }

      const dataFromToken = decodedToken as { id: number; email: string }
      const profileData = await User.findOne({
        where: {
          id: dataFromToken.id,
        },
        attributes: { exclude: ['password', 'createdAt', 'updatedAt', 'avatarImgPath'] },
      })

      res.json(profileData?.dataValues)
    } catch (err) {
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: (err as Error).message })
    }
  },

  updateProfileData: async (req: Request, res: Response) => {
    const newData = req.body

    try {
      const tokenData = JWT.decode(req)

      if (typeof tokenData === 'string') {
        throw new Error('Требуется авторизация')
      }

      await User.update(newData, {
        where: {
          id: tokenData.id,
          email: tokenData.email,
        },
      })

      const updatedProfile = (await User.findOne({
        where: {
          id: tokenData.id,
          email: tokenData.email,
        },
        attributes: { exclude: ['id', 'password', 'createdAt', 'updatedAt'] },
      })) as IUser

      res.status(HttpStatusCodes.OK).json(updatedProfile)
    } catch (error) {
      console.log((error as Error).message)
      res.status(HttpStatusCodes.BAD_REQUEST).json({ error: (error as Error).message })
    }
  },

  updateProfileImg: async (req: Request, res: Response) => {
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

      const baseUrl = process.env.BASE_URL || 'http://localhost:'
      const port = process.env.PORT || 3001
      await User.update(
        {
          avatarImgPath: imagePath,
          avatarImg: baseUrl + port + '/profile/img/' + req.body.id,
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
  },

  removeProfileImg: async (req: Request, res: Response) => {
    try {
      const id = req.params.id

      const profile = await User.findOne({
        where: {
          id,
        },
      })

      if (!profile?.avatarImgPath) {
        throw new Error('изображение не найдено')
      }

      const unlinkAsync = promisify(unlink)
      unlinkAsync(profile?.avatarImgPath)

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
      res.send((error as Error).message)
    }
  },

  getProfileImg: async (req: Request, res: Response) => {
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
      res.send((error as Error).message)
    }
  },
}
