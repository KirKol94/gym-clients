import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import cx from 'classix'

import { CURRENT_PATHNAME_KEY } from '@/shared/const/localStorage/currentLocationKey'
import { Text, TextSize } from '@/shared/ui/Text'

import classes from './SidebarItem.module.scss'

interface SidebarItemProps {
  data: { title: string; icon: string; to: string }
  isOpen: boolean
}

export const SidebarItem = ({ data, isOpen }: SidebarItemProps) => {
  const { pathname } = useLocation()
  const { title, icon, to } = data

  const cardOpen = cx(pathname === to ? classes.card__active : classes.card)
  const cardClose = cx(pathname === to ? classes.card__close__active : classes.card__close)
  const textClass = cx(pathname === to ? classes.text__active : classes.text)
  const bgClass = cx(pathname === to && classes.background)
  const cardClass = cx(isOpen ? cardOpen : cardClose)

  useEffect(() => {
    localStorage.setItem(CURRENT_PATHNAME_KEY, pathname)
  }, [pathname])

  return (
    <div className={classes.wrapper}>
      <Link className={cardClass} to={to}>
        <img src={icon} alt={title} />
        {isOpen && (
          <Text className={textClass} size={TextSize.S}>
            {title}
          </Text>
        )}
      </Link>
      <div className={bgClass} />
    </div>
  )
}
