import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { Router } from '@/app/routes'
import { getIsAuth, userActions } from '@/entities/User'
import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'

import '../styles/index.scss'

export const App = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const isAuth = useAppSelector(getIsAuth)

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  useEffect(() => {
    if (isAuth) {
      navigate(ROUTER_PATH.PROFILE)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuth])

  return <Router />
}
