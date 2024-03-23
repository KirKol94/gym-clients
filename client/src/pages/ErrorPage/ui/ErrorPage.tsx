import { memo } from 'react'

import { Title } from '@/shared/ui/Title'

import cls from './ErrorPage.module.scss'

export interface ErrorPageProps {}

export const ErrorPage = memo(() => {
  return (
    <div className={cls.ErrorPage}>
      <Title size="xxl" level={1}>
        Что-то пошло не так
      </Title>
      <a href="/">Перезагрузите страницу</a>
    </div>
  )
})
