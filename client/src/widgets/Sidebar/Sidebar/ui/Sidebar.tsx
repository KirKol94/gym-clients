import { useState } from 'react'

import Agent from '@/shared/assets/icons/Agent.svg'
import Avatar from '@/shared/assets/icons/Avatar.svg'
import BackArrow from '@/shared/assets/icons/Back.svg'
import Contract from '@/shared/assets/icons/Contract.svg'
import Deals from '@/shared/assets/icons/Deals.svg'
import Group from '@/shared/assets/icons/Group.svg'
import Logo from '@/shared/assets/icons/Logo.svg'
import LogoMini from '@/shared/assets/icons/LogoMini.svg'
import Setting from '@/shared/assets/icons/SettingsWhite.svg'
import Users from '@/shared/assets/icons/UsersWhite.svg'
import { ROUTER_PATH } from '@/shared/const/path/PATH'

import { SidebarItem } from '../../SidebarItem'

import classes from './Sidebar.module.scss'

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const user = { title: 'Иван Иванов', icon: Avatar, to: ROUTER_PATH.PROFILE }

  const sidebarItems = [
    {
      title: 'Пользователи',
      icon: Users,
      to: ROUTER_PATH.USERS,
    },
    {
      title: 'Группы компаний',
      icon: Group,
      to: ROUTER_PATH.GROUP,
    },
    {
      title: 'Контрагенты',
      icon: Agent,
      to: ROUTER_PATH.AGENT,
    },
    {
      title: 'Контракты',
      icon: Contract,
      to: ROUTER_PATH.CONTRACT,
    },
    {
      title: 'Сделки',
      icon: Deals,
      to: ROUTER_PATH.DEALS,
    },
    {
      title: 'Настройки',
      icon: Setting,
      to: ROUTER_PATH.SETTINGS,
    },
  ]

  const onSidebarVisibleToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <aside className={isOpen ? classes.sidebar : classes.sidebar__hiden}>
      <div onClick={onSidebarVisibleToggle} className={classes.logo__wrapper}>
        <img src={isOpen ? Logo : LogoMini} alt="Логотип" />
        <div className={classes.back}>
          <img className={isOpen ? classes.img : classes.img__active} src={BackArrow} />
        </div>
      </div>

      <nav className={classes.links__wrapper}>
        <SidebarItem data={user} isOpen={isOpen} />
        <ul className={classes.cards__wrapper}>
          {sidebarItems.map((el, index) => (
            <SidebarItem data={el} isOpen={isOpen} key={el.title + index} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}
