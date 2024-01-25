import cx from 'classix'

import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { AppLink, AppLinkSize } from '@/shared/ui/AppLink'
import { Title, TitleSize } from '@/shared/ui/Title'

import NotFoundImg from '../assets/image/notfound.svg?react'

import classes from './NotFoundPage.module.scss'

export const NotFoundPage = () => {
  const className = cx('notfound__container', classes.page)

  return (
    <div className={className}>
      <Title className={classes.title} size={TitleSize.XXL}>
        Странца не найдена
      </Title>
      <NotFoundImg />
      <div>
        <AppLink to={ROUTER_PATH.HOME} size={AppLinkSize.M}>
          На главную
        </AppLink>
      </div>
    </div>
  )
}
