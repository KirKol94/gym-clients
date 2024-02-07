import { useState } from 'react'
import cx from 'classix'

import Agent from '@/shared/assets/icons/Agent.svg'
import Avatar from '@/shared/assets/icons/Avatar.svg'
import BackArrow from '@/shared/assets/icons/Back.svg?react'
import Contract from '@/shared/assets/icons/Contract.svg'
import Deals from '@/shared/assets/icons/Deals.svg'
import Group from '@/shared/assets/icons/Group.svg'
import Logo from '@/shared/assets/icons/Logo.svg?react'
import LogoMini from '@/shared/assets/icons/LogoMini.svg?react'
import Setting from '@/shared/assets/icons/SettingsWhite.svg'
import Users from '@/shared/assets/icons/UsersWhite.svg'
import { ROUTER_PATH } from '@/shared/const/path/PATH'

import { SidebarItem } from '../../SidebarItem'

import classes from './Sidebar.module.scss'

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const sidebarItems = [
    {
      title: 'Иван Иванов',
      icon: Avatar,
      to: ROUTER_PATH.PROFILE,
    },
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
    <aside className={cx(classes.sidebar, !isOpen && classes.sidebar_hidden)}>
      <div className={classes.logo__wrapper}>
        {isOpen ? <Logo /> : <LogoMini />}
        <button onClick={onSidebarVisibleToggle} className={cx(classes.back, !isOpen && classes.back_hidden)}>
          <BackArrow />
        </button>
      </div>

      <nav className={classes.nav}>
        <ul className={classes.list}>
          {sidebarItems.map((el, index) => (
            <SidebarItem data={el} isOpen={isOpen} key={el.title + index} />
          ))}
        </ul>
      </nav>
    </aside>
  )
}
