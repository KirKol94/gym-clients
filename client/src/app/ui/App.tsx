import { useEffect } from 'react'

import { Router } from '@/app/routes'
import { useGetProfileData, userActions } from '@/entities/User'
import { useAppDispatch } from '@/shared/hooks'

import '../styles/index.scss'

export const App = () => {
  const dispatch = useAppDispatch()
  const { data: profileData } = useGetProfileData()

  useEffect(() => {
    if (profileData) {
      dispatch(userActions.setProfileData(profileData))
    }

    dispatch(userActions.initAuthData())
  }, [dispatch, profileData])

  return <Router />
}
