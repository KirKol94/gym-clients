import { config as dotenvConfig } from 'dotenv'

import { app } from './app'

dotenvConfig() // разрешаем доступ до process.env переменных

const PORT = process.env.PORT ?? 3001

app.listen(PORT, () => {
  console.log(`server is ready on : http://localhost:${PORT}`)
})
