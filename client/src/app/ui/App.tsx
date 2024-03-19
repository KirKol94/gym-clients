import { useEffect } from 'react'
import { withErrorBoundary } from 'react-error-boundary'

import { Router } from '@/app/routes'
import { userActions } from '@/entities/User'
import { ErrorPage } from '@/pages/ErrorPage'
import { useAppDispatch } from '@/shared/hooks'

import '../styles/index.scss'

export const App = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(userActions.initAuthData())
  }, [dispatch])

  return <Router />
}

export const AppWithErrorBoundary = withErrorBoundary(App, {
  fallback: <ErrorPage />,
})
