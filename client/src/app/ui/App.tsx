import { useEffect } from 'react'

import { Router } from '@/app/routes'
import { userActions } from '@/entities/User'
import { useAppDispatch } from '@/shared/hooks'

import '../styles/index.scss'

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return <Router />
}
