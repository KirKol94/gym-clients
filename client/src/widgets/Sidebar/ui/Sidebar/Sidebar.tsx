import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

import Agent from '@/shared/assets/icons/Agent.svg'
import Avatar from '@/shared/assets/icons/Avatar.svg'
import BackArrow from '@/shared/assets/icons/Back.svg'
import Contract from '@/shared/assets/icons/Contract.svg'
import Deals from '@/shared/assets/icons/Deals.svg'
import Group from '@/shared/assets/icons/Group.svg'
import Setting from '@/shared/assets/icons/Settings.svg'
import Users from '@/shared/assets/icons/Users.svg'
import Logo from '@/shared/assets/Logo.svg'

import SidebarItem from '../SidebarItem/SidebarItem'

import classes from './Sidebar.module.scss'

const user = { title: 'Иван Иванов', link: Avatar, to: '/' }

const sidebarItems = [
  {
    title: 'Пользователи',
    link: Users,
    to: '/users',
  },
  {
    title: 'Группы компаний',
    link: Group,
    to: '/group',
  },
  {
    title: 'Контрагенты',
    link: Agent,
    to: '/agent',
  },
  {
    title: 'Контракты',
    link: Contract,
    to: '/contract',
  },
  {
    title: 'Сделки',
    link: Deals,
    to: '/deals',
  },
  {
    title: 'Настройки',
    link: Setting,
    to: '/setting',
  },
]

export const Sidebar = () => {
  const location = useLocation()
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    location.pathname === '/' && setActive(user.title)
  }, [location.pathname])

  return (
    <aside className={classes.sidebar}>
      <div className={classes.logo__wrapper}>
        <img src={Logo} alt="Логотип" />
        <div className={classes.back}>
          <img src={BackArrow} />
        </div>
      </div>

      <nav className={classes.links__wrapper}>
        <SidebarItem data={user} setActive={setActive} active={active} />
        <ul className={classes.cards__wrapper}>
          {sidebarItems.map((el, index) => (
            <SidebarItem data={el} setActive={setActive} active={active} key={el.title + index} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}
