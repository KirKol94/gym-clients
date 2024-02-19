import { memo } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classix'

import { Text, textSize } from '@/shared/ui/Text'

import classes from './SidebarItem.module.scss'

interface SidebarItemProps {
  data: {
    title: string
    Icon: JSX.Element
    to: string
  }
  isOpen: boolean
  pathname: string
}

export const SidebarItem = memo(({ data, isOpen, pathname }: SidebarItemProps) => {
  const { title, Icon, to } = data

  const textClass = cx(classes.text, pathname === to && classes.text_active)
  const cardClass = cx(
    classes.card,
    !isOpen && classes.card__close,
    pathname === to && classes.card_active,
    pathname === to && isOpen && classes.card__close_active,
  )

  return (
    <div className={classes.wrapper}>
      <Link className={cardClass} to={to}>
        {Icon}
        <Text className={textClass} size={textSize.small}>
          {title}
        </Text>
      </Link>

      <div className={cx(pathname === to && classes.background)} />
    </div>
  )
})
