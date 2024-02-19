import cx from 'classix'

import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { AppLink, appLinkSize } from '@/shared/ui/AppLink'
import { Title, titleSize } from '@/shared/ui/Title'

import NotFoundImg from '../assets/image/notfound.svg?react'

import classes from './NotFoundPage.module.scss'

export const NotFoundPage = () => {
  const className = cx('notfound__container', classes.page)

  return (
    <div className={className}>
      <Title level={1} className={classes.title} size={titleSize.xxl}>
        Странца не найдена
      </Title>
      <NotFoundImg />
      <div>
        <AppLink to={ROUTER_PATH.PROFILE} size={appLinkSize.medium}>
          На главную
        </AppLink>
      </div>
    </div>
  )
}
