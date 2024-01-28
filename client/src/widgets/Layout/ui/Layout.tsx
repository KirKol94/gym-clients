import { Outlet } from 'react-router-dom'

import { Footer } from '../../../widgets/Footer/index'
import { Sidebar } from '../../../widgets/Sidebar/Sidebar'

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
