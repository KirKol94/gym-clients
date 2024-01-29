import { lazy } from 'react'

import { AuthType } from '@/features/AuthForm'
import { ROUTER_PATH } from '@/shared/const/path/PATH'

import { IRoutesData } from '../types/routes.interface'

const AuthPage = lazy(() => import('@/pages/AuthPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const UsersPage = lazy(() => import('@/pages/UsersPage'))
const Group = lazy(() => import('@/pages/Group'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

export const routesData: IRoutesData[] = [
  {
    index: true,
    component: ProfilePage,
    isAuth: true,
  },
  {
    component: UsersPage,
    isAuth: true,
    path: ROUTER_PATH.USERS,
  },
  {
    component: Group,
    isAuth: true,
    path: ROUTER_PATH.GROUP,
  },
  {
    component: AuthPage,
    path: ROUTER_PATH.LOGIN,
    isAuth: false,
  },
  {
    component: AuthPage,
    path: ROUTER_PATH.REGISTER,
    type: AuthType.REGISTER,
    isAuth: false,
  },
  {
    component: NotFoundPage,
    path: ROUTER_PATH.NOTFOUNDPAGE,
    isAuth: false,
  },
]
