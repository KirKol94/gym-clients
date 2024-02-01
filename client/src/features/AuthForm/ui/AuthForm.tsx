import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

import { getIsAuth, User, userActions } from '@/entities/User'
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage/accessTokenKey'
import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { AppLink, AppLinkSize } from '@/shared/ui/AppLink'
import { Button, ButtonSize } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Text, TextSize } from '@/shared/ui/Text'
import { Title, TitleSize } from '@/shared/ui/Title'

import { useSendAuthData } from '../api/login.api'
import { useSendRegisterDataMutation } from '../api/register.api'
import { AuthType } from '../model/types/auth'

import classes from './AuthForm.module.scss'

interface AuthFormProps {
  type?: AuthType
}

type FormData = Omit<User, 'id'> & { password: string }

export const AuthForm = ({ type = AuthType.LOGIN }: AuthFormProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [sendAuthData, { data: resAuthData, status: authStatus }] = useSendAuthData()
  const [sendRegisterData] = useSendRegisterDataMutation()
  const isAuth = useAppSelector(getIsAuth)

  const [userData, setUserData] = useState<FormData>({
    username: '',
    password: '',
    name: '',
    surname: '',
    patronymic: '',
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    type === AuthType.LOGIN && handleLogin()
    type === AuthType.REGISTER && handleRegister()
  }

  const handleRegister = async () => {
    await sendRegisterData(userData)
  }

  const handleLogin = async () => {
    const authData = {
      username: userData.username,
      password: userData.password,
    }
    await sendAuthData(authData)
  }

  useEffect(() => {
    if (authStatus === 'fulfilled' && resAuthData?.Token) {
      dispatch(userActions.setIsAuth())
      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, resAuthData?.Token)
    }
  }, [authStatus, dispatch, navigate, resAuthData?.Token])

  if (isAuth) return <Navigate to={ROUTER_PATH.PROFILE} />

  return (
    <>
      <Title size={TitleSize.XXL} className={classes.title}>
        {type === AuthType.LOGIN && 'Авторизация'}
        {type === AuthType.REGISTER && 'Регистрация'}
      </Title>

      <form className={classes.form} onSubmit={handleSubmit}>
        <Input
          inputName="Email"
          name="username"
          placeholder="Email"
          onChange={handleInputChange}
          value={userData.username}
        />
        <Input
          inputName="Пароль"
          name="password"
          placeholder="Пароль"
          onChange={handleInputChange}
          value={userData.password}
        />

        {type === AuthType.REGISTER && (
          <>
            <Input inputName="Имя" name="name" placeholder="Имя" onChange={handleInputChange} value={userData.name} />
            <Input
              inputName="Фамилия"
              name="surname"
              placeholder="Фамилия"
              onChange={handleInputChange}
              value={userData.surname}
            />
            <Input
              inputName="Отчество"
              name="patronymic"
              placeholder="Отчество"
              onChange={handleInputChange}
              value={userData.patronymic}
            />
          </>
        )}

        <div className={classes.footer}>
          <Button size={ButtonSize.M} type="submit">
            {type === AuthType.LOGIN && 'Войти'}
            {type === AuthType.REGISTER && 'Регистрация'}
          </Button>

          <div>
            <Text size={TextSize.S}>
              {type === AuthType.LOGIN && 'Еще нет аккаунта?'}
              {type === AuthType.REGISTER && 'Уже нет аккаунт?'}
            </Text>

            <AppLink to={type === AuthType.LOGIN ? ROUTER_PATH.REGISTER : ROUTER_PATH.LOGIN} size={AppLinkSize.S}>
              {type === AuthType.REGISTER && 'Войти'}
              {type === AuthType.LOGIN && 'Регистрация'}
            </AppLink>
          </div>
        </div>
      </form>
    </>
  )
}
