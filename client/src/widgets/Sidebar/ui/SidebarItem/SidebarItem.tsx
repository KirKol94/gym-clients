import { useNavigate } from 'react-router-dom'
import cx from 'classix'

import classes from './SidebarItem.module.scss'

interface SidebarItemProps {
  data: { title: string; link: string; to: string }
  active: string
  setActive: (title: string) => void
}

const SidebarItem = ({ data, active, setActive }: SidebarItemProps) => {
  const navigate = useNavigate()
  const { title, link, to } = data

  const cardClass = cx(active === title ? classes.card__active : classes.card)
  const bgClass = cx(active === title && classes.background)

  const handeleClick = () => {
    setActive(title)
    navigate(to)
  }

  return (
    <div className={classes.wrapper}>
      <li className={cardClass} onClick={handeleClick}>
        <img src={link} alt={title} />
        <p>{title}</p>
      </li>
      <div className={bgClass} />
    </div>
  )
}

export default SidebarItem
