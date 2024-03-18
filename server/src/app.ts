import cors from 'cors'
import express, { json } from 'express'

import { logRequestBody } from './middlewares/logRequestBody'
import { authRouter } from './routes/authRouter'
import { profilesRouter } from './routes/profileRouter'
import { usersRouter } from './routes/usersRouter'

export const app = express()

app.use(cors())
app.use(json({ limit: '3mb' }))
app.use(logRequestBody)

app.use('/auth', authRouter())
app.use('/users', usersRouter())
app.use('/profile', profilesRouter())
