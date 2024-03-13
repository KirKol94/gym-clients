import cors from 'cors'
import express, { json } from 'express'

import { indexRouter } from './routes/indexRouter'

export const app = express()
app.use(cors())
app.use(json())

app.use('/', indexRouter())
