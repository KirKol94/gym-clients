import cors from 'cors'
import express, { json } from 'express'

import { authRouter } from './routes/auth/authRouter'

export const app = express()
app.use(cors())
app.use(json())

app.use('/auth', authRouter())
