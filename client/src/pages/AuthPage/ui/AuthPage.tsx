import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { getIsAuth } from '@/entities/User'
import { AuthForm, AuthType } from '@/features/AuthForm'
import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { useAppSelector } from '@/shared/hooks'

import classes from './AuthPage.module.scss'

interface AuthPage {
  type?: AuthType
}

export const AuthPage = ({ type = AuthType.LOGIN }: AuthPage) => {
  const navigate = useNavigate()
  const isAuth = useAppSelector(getIsAuth)

  useEffect(() => {
    if (isAuth) navigate(ROUTER_PATH.HOME)
  }, [isAuth, navigate])
  return (
    <div className={classes.page}>
      {type === AuthType.LOGIN && <AuthForm type={type} />}
      {type === AuthType.REGISTER && <AuthForm type={type} />}
    </div>
  )
}

export default AuthPage
