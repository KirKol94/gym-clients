import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import type { User } from '@/entities/User'
import { userActions } from '@/entities/User'
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage/accessTokenKey'
import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { useAppDispatch } from '@/shared/hooks'
import { AppLink, AppLinkSize } from '@/shared/ui/AppLink'
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Text, TextSize } from '@/shared/ui/Text'
import { Title, TitleSize } from '@/shared/ui/Title'

import { useSendAuthData } from '../api/login.api'
import { useSendRegisterData } from '../api/register.api'
import { AuthType } from '../model/types/auth'

import classes from './AuthForm.module.scss'

interface AuthFormProps {
  type?: AuthType
}

type FormData = Omit<User, 'id'> & { password: string }

export const AuthForm = ({ type = AuthType.LOGIN }: AuthFormProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [sendAuthData, { data: resAuthData, status: authStatus, error: authError }] = useSendAuthData()
  const [sendRegisterData, { status: registerStatus, error: registerError }] = useSendRegisterData()
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onChange' })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    type === AuthType.LOGIN && handleLogin(data)
    type === AuthType.REGISTER && handleRegister(data)
    reset()
  }

  const handleRegister = async (data: FormData) => {
    await sendRegisterData(data)
  }

  const handleLogin = async (data: FormData) => {
    const authData = {
      username: data.username,
      password: data.password,
    }
    await sendAuthData(authData)
  }

  useEffect(() => {
    if (authStatus === 'fulfilled' && resAuthData?.Token) {
      dispatch(userActions.setIsAuth())
      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, resAuthData?.Token)
    }
  }, [authStatus, dispatch, navigate, resAuthData?.Token])

  useEffect(() => {
    if (registerStatus === 'rejected') {
      alert('ошибка регистрации (см. консоль)')
      console.log((registerError as FetchBaseQueryError).data)
    }

    if (authStatus === 'rejected') {
      alert('ошибка авторизации (см. консоль)')
      console.log((authError as FetchBaseQueryError).data)
    }
  }, [authError, authStatus, registerError, registerStatus])

  if (registerStatus === 'fulfilled') return <Navigate to={ROUTER_PATH.LOGIN} />

  return (
    <>
      <Title level={1} size={TitleSize.XXL} className={classes.title}>
        {type === AuthType.LOGIN && 'Авторизация'}
        {type === AuthType.REGISTER && 'Регистрация'}
      </Title>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register('username', {
            required: 'Это поле обязательное',
            minLength: {
              value: 5,
              message: 'Не менее 5 символов',
            },
          })}
          error={errors?.username?.message}
          inputName="Имя пользователя"
          placeholder="Имя пользователя"
        />

        <Input
          type="password"
          {...register('password', {
            required: 'Это поле обязательное',
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]+$/,
              message: 'Латинские буквы, цифра и символы, кроме пробела',
            },
            minLength: {
              value: 6,
              message: 'Не менее 6 символов',
            },
          })}
          error={errors?.password?.message}
          inputName="Пароль*"
          placeholder="Пароль"
        />

        {type === AuthType.REGISTER && (
          <>
            <Input
              {...register('email', {
                required: 'Обязательное поле',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Введите валидный email',
                },
              })}
              error={errors?.email?.message}
              inputName="Email"
              placeholder="Email"
            />

            <Input
              {...register('firstName', {
                required: 'Обязательное поле',
                minLength: {
                  value: 2,
                  message: 'Не менее 2 символов',
                },
                maxLength: {
                  value: 15,
                  message: 'Не более 15 символов',
                },
                pattern: {
                  value: /^[а-яА-ЯёЁ-]*$/,
                  message: 'Только русские буквы и «-»',
                },
              })}
              error={errors?.firstName?.message}
              inputName="Имя"
              placeholder="Имя"
            />

            <Input
              {...register('middleName', {
                required: 'Обязательное поле',
                minLength: {
                  value: 2,
                  message: 'Не менее 2 символов',
                },
                maxLength: {
                  value: 24,
                  message: 'Не более 24 символов',
                },
                pattern: {
                  value: /^[а-яА-ЯёЁ-]*$/,
                  message: 'Только русские буквы и «-»',
                },
              })}
              error={errors?.middleName?.message}
              inputName="Фамилия"
              placeholder="Фамилия"
            />

            <Input
              {...register('lastName', {
                minLength: {
                  value: 6,
                  message: 'Не менее 6 символов',
                },
                maxLength: {
                  value: 20,
                  message: 'Не более 20 символов',
                },
                pattern: {
                  value: /^[а-яА-ЯёЁ]*$/,
                  message: 'Только русские буквы',
                },
              })}
              error={errors?.lastName?.message}
              inputName="Отчество"
              placeholder="Отчество"
            />
          </>
        )}

        <div className={classes.footer}>
          <Button size={ButtonSize.M} type="submit" theme={ButtonTheme.PRIMARY} disabled={!isValid}>
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
