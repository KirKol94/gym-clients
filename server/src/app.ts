import path from 'path'

import cors from 'cors'
import express, { json } from 'express'
import type { Database } from 'sqlite3'
import * as sqlite3 from 'sqlite3'

import { indexRouter } from './routes/indexRouter'

const db: Database = new sqlite3.Database(path.resolve(__dirname, '..', 'database.db'))

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    login VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
  )
`)

export const app = express()
app.use(cors())
app.use(json())

app.use('/', indexRouter())
