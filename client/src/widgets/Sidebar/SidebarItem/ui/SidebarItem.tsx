import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import cx from 'classix'

import { CURRENT_PATHNAME_KEY } from '@/shared/const/localStorage/currentLocationKey'
import { Text, TextSize } from '@/shared/ui/Text'

import classes from './SidebarItem.module.scss'

interface SidebarItemProps {
  data: {
    title: string
    Icon: JSX.Element
    to: string
  }
  isOpen: boolean
}

export const SidebarItem = ({ data, isOpen }: SidebarItemProps) => {
  const { pathname } = useLocation()
  const { title, Icon, to } = data

  const textClass = cx(classes.text, pathname === to && classes.text_active)
  const cardClass = cx(classes.card, !isOpen && classes.card__close, pathname === to && classes.card_active)

  useEffect(() => {
    localStorage.setItem(CURRENT_PATHNAME_KEY, pathname)
  }, [pathname])

  return (
    <div className={classes.wrapper}>
      <Link className={cardClass} to={to}>
        {Icon}
        <Text className={textClass} size={TextSize.S}>
          {title}
        </Text>
      </Link>

      <div className={cx(pathname === to && classes.background)} />
    </div>
  )
}
