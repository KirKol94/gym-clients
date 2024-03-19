import { memo, useEffect } from 'react'
import cx from 'classix'

import cls from './ErrorPage.module.scss'

export interface ErrorPageProps {
  className?: string
}

export const ErrorPage = memo(({ className }: ErrorPageProps) => {
  const errorPageClass = cx(cls.errorPage, className)
  useEffect(() => {
    localStorage.clear()
  }, [])

  return (
    <div className={errorPageClass}>
      <h1>Что-то пошло не так</h1>
      <a href="/">Перезагрузите страницу</a>
    </div>
  )
})
