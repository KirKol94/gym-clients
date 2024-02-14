import type { ReactNode } from 'react'
import { memo } from 'react'

import { Footer } from '../../Footer'
import { Sidebar } from '../../Sidebar'

import classes from './Page.module.scss'

export interface PageProps {
  children: ReactNode
}

export const Page = memo(({ children }: PageProps) => {
  return (
    <div className="page__container">
      <div className={classes.content}>
        <Sidebar />
        <main className={classes.main}>{children}</main>
      </div>
      <Footer />
    </div>
  )
})
