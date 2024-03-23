import { memo, useEffect } from 'react'

export interface ErrorPageProps {}

export const ErrorPage = memo(() => {
  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <div>
      <h1>Что-то пошло не так</h1>
      <a href="/">Перезагрузите страницу</a>
    </div>
  )
})
