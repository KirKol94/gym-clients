import type { Router, Request, Response } from 'express'
import express from 'express'

export const indexRouter = (): Router => {
   const router = express.Router()

   router.get('/', (req: Request, res: Response) => {
      res.send({ message: 'ok' })
   })

   return router
}
