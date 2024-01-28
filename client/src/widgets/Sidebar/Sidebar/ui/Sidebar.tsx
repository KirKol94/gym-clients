import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Agent from '@/shared/assets/icons/Agent.svg'
import Avatar from '@/shared/assets/icons/Avatar.svg'
import BackArrow from '@/shared/assets/icons/Back.svg'
import Contract from '@/shared/assets/icons/Contract.svg'
import Deals from '@/shared/assets/icons/Deals.svg'
import Group from '@/shared/assets/icons/Group.svg'
import Setting from '@/shared/assets/icons/SettingsWhite.svg'
import Users from '@/shared/assets/icons/UsersWhite.svg'
import Logo from '@/shared/assets/Logo.svg'
import LogoMini from '@/shared/assets/LogoMini.svg'
import { ROUTER_PATH } from '@/shared/const/path/PATH'

import { SidebarItem } from '../../SidebarItem'

import classes from './Sidebar.module.scss'

const user = { title: 'Иван Иванов', link: Avatar, to: ROUTER_PATH.HOME }

const sidebarItems = [
  {
    title: 'Пользователи',
    link: Users,
    to: ROUTER_PATH.USERS,
  },
  {
    title: 'Группы компаний',
    link: Group,
    to: ROUTER_PATH.GROUP,
  },
  {
    title: 'Контрагенты',
    link: Agent,
    to: ROUTER_PATH.AGENT,
  },
  {
    title: 'Контракты',
    link: Contract,
    to: ROUTER_PATH.CONTRACT,
  },
  {
    title: 'Сделки',
    link: Deals,
    to: ROUTER_PATH.DEALS,
  },
  {
    title: 'Настройки',
    link: Setting,
    to: ROUTER_PATH.SETTINGS,
  },
]

export const Sidebar = () => {
  const { pathname } = useLocation()
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(true)

  useEffect(() => {
    pathname === ROUTER_PATH.HOME && setActive(user.title)
  }, [pathname])

  const onSidebarVisibleToggle = () => {
    setOpen(!open)
  }
  return (
    <aside className={open ? classes.sidebar : classes.sidebar__hiden}>
      <div onClick={onSidebarVisibleToggle} className={classes.logo__wrapper}>
        <img src={open ? Logo : LogoMini} alt="Логотип" />
        <div className={classes.back}>
          <img className={open ? classes.img : classes.img__active} src={BackArrow} />
        </div>
      </div>

      <nav className={classes.links__wrapper}>
        <SidebarItem data={user} setActive={setActive} active={active} open={open} />
        <ul className={classes.cards__wrapper}>
          {sidebarItems.map((el, index) => (
            <SidebarItem data={el} setActive={setActive} active={active} open={open} key={el.title + index} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}
