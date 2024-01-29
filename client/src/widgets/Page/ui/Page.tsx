import { ReactNode } from 'react'

import { Footer } from '../../Footer'
import { Sidebar } from '../../Sidebar'

import classes from './Page.module.scss'

interface Page {
  children: ReactNode
}

export const Page = ({ children }: Page) => {
  return (
    <div className="page__container">
      <div className={classes.content}>
        <Sidebar />
        <main className={classes.main}>{children}</main>
      </div>
      <Footer />
    </div>
  )
}
