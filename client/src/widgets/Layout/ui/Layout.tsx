import { Outlet } from 'react-router-dom'

import { Footer } from '../../Footer'
import { Sidebar } from '../../Sidebar/Sidebar'

import classes from './Layout.module.scss'

export const Layout = () => {
  return (
    <div className="layout__container">
      <div className={classes.content}>
        <Sidebar />
        <main className={classes.main}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
