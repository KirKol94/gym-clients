import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import cx from 'classix'

import { appLinkSize } from '../model/types/appLink'

import classes from './AppLink.module.scss'

export interface AppLinkProps {
  to: string
  size: keyof typeof appLinkSize
  children: ReactNode
}

export const AppLink = ({ to, size, children }: AppLinkProps) => {
  const className = cx(
    classes.applink,
    size === appLinkSize.small && classes.applink__s,
    size === appLinkSize.medium && classes.applink__m,
  )

  return (
    <Link to={to} className={className}>
      {children}
    </Link>
  )
}
