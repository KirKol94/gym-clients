import cors from 'cors'
import express, { json } from 'express'

import { logRequestBody } from './middlewares/logRequestBody'
import { authRouter } from './routes/usersRouter'

export const app = express()

app.use(cors())
app.use(json())
app.use(logRequestBody)

app.use('/users', authRouter())
