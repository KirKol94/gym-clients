import cors from 'cors'
import express, { json } from 'express'

import { authRouter } from './routes/authRouter'

export const app = express()
app.use(cors())
app.use(json())

app.use('/auth', authRouter())
