import { useNavigate } from 'react-router-dom'
import cx from 'classix'

import classes from './SidebarItem.module.scss'

interface SidebarItemProps {
  data: { title: string; link: string; to: string }
  active: string
  setActive: (title: string) => void
  open: boolean
}

const SidebarItem = ({ data, active, setActive, open }: SidebarItemProps) => {
  const navigate = useNavigate()
  const { title, link, to } = data

  const cardOpen = cx(active === title ? classes.card__active : classes.card)
  const cardClose = cx(active === title ? classes.card__close__active : classes.card__close)

  const cardClass = cx(open ? cardOpen : cardClose)
  const bgClass = cx(active === title && classes.background)

  const handeleClick = () => {
    setActive(title)
    navigate(to)
  }

  return (
    <div className={classes.wrapper}>
      <li className={cardClass} onClick={handeleClick}>
        <img src={link} alt={title} />
        {open && <p>{title}</p>}
      </li>
      <div className={bgClass} />
    </div>
  )
}

export default SidebarItem
