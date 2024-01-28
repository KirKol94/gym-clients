import { NavLink } from 'react-router-dom'
import cx from 'classix'

import { Text, TextSize } from '@/shared/ui/Text'

import classes from './SidebarItem.module.scss'

interface SidebarItemProps {
  data: { title: string; link: string; to: string }
  active: string
  setActive: (title: string) => void
  open: boolean
}

export const SidebarItem = ({ data, active, setActive, open }: SidebarItemProps) => {
  const { title, link, to } = data

  const cardOpen = cx(active === title ? classes.card__active : classes.card)
  const cardClose = cx(active === title ? classes.card__close__active : classes.card__close)
  const textClass = cx(active === title ? classes.text__active : classes.text)

  const cardClass = cx(open ? cardOpen : cardClose)
  const bgClass = cx(active === title && classes.background)

  const handleClick = () => {
    setActive(title)
  }

  return (
    <div className={classes.wrapper}>
      <NavLink className={cardClass} to={to} onClick={handleClick}>
        <img src={link} alt={title} />
        {open && (
          <Text className={textClass} size={TextSize.S}>
            {title}
          </Text>
        )}
      </NavLink>
      <div className={bgClass} />
    </div>
  )
}
