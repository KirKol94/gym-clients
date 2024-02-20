import type { ReactNode } from 'react'
import { memo } from 'react'
import cx from 'classix'

import { Footer } from '../../Footer'
import { Sidebar } from '../../Sidebar'

import classes from './Page.module.scss'

export interface PageProps {
  children: ReactNode
}

export const Page = memo(({ children }: PageProps) => {
  return (
    <div className={cx('page__container', classes.page)}>
      <div className={classes.content}>
        <Sidebar />
        <main className={classes.main}>{children}</main>
      </div>
      <Footer />
    </div>
  )
})
