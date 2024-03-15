import { useEffect } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query'

import type { User } from '@/entities/User'
import { userActions } from '@/entities/User'
import { ACCESS_TOKEN_LOCAL_STORAGE_KEY } from '@/shared/const/localStorage/accessTokenKey'
import { ROUTER_PATH } from '@/shared/const/path/PATH'
import { useAppDispatch } from '@/shared/hooks'
import { AppLink, appLinkSize } from '@/shared/ui/AppLink'
import { Button, buttonSize, buttonTheme } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Text, textSize } from '@/shared/ui/Text'
import { Title, titleSize } from '@/shared/ui/Title'

import { useSendAuthData } from '../api/login.api'
import { useSendRegisterData } from '../api/register.api'
import { authType } from '../model/types/auth'

import classes from './AuthForm.module.scss'

export interface AuthFormProps {
  type?: keyof typeof authType
}

type FormData = Omit<User, 'id'> & { password: string }

export const AuthForm = ({ type = authType.login }: AuthFormProps) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [sendAuthData, { data: resAuthData, status: authStatus, error: authError }] = useSendAuthData()
  const [sendRegisterData, { status: registerStatus, error: registerError }] = useSendRegisterData()
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      middleName: null,
    },
  })

  const onSubmit: SubmitHandler<FormData> = (data) => {
    type === authType.login && handleLogin(data)
    type === authType.register && handleRegister(data)
    reset()
  }

  const handleRegister = async (data: FormData) => {
    await sendRegisterData(data)
  }

  const handleLogin = async (data: FormData) => {
    const authData = {
      email: data.email,
      password: data.password,
    }
    await sendAuthData(authData)
  }

  useEffect(() => {
    if (authStatus === 'fulfilled' && resAuthData?.token) {
      dispatch(userActions.setIsAuth())
      localStorage.setItem(ACCESS_TOKEN_LOCAL_STORAGE_KEY, resAuthData?.token)
    }
  }, [authStatus, dispatch, resAuthData])

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

  useEffect(() => {
    if (registerStatus === 'fulfilled') navigate(ROUTER_PATH.LOGIN)
  }, [navigate, registerStatus])

  return (
    <>
      <Title level={1} size={titleSize.xxl} className={classes.title}>
        {type === authType.login ? 'Авторизация' : 'Регистрация'}
      </Title>

      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
          type="password"
          {...register('password', {
            required: 'Это поле обязательное',
            pattern: {
              value: /^[a-zA-Z0-9!@#$%^&*()_+{}[\]:;<>,.?~\\/-]+$/,
              message: 'Латинские буквы, цифра и символы, кроме пробела',
            },
            minLength: {
              value: 5,
              message: 'Не менее 6 символов',
            },
          })}
          error={errors?.password?.message}
          inputName="Пароль*"
          placeholder="Пароль"
        />

        {type === authType.register && (
          <>
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
              {...register('lastName', {
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
              {...register('middleName', {
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
          <Button size={buttonSize.m} type="submit" theme={buttonTheme.primary} disabled={!isValid}>
            {type === authType.login && 'Войти'}
            {type === authType.register && 'Регистрация'}
          </Button>

          <div>
            <Text size={textSize.small}>
              {type === authType.login && 'Еще нет аккаунта?'}
              {type === authType.register && 'Уже нет аккаунт?'}
            </Text>

            <AppLink to={type === authType.login ? ROUTER_PATH.REGISTER : ROUTER_PATH.LOGIN} size={appLinkSize.small}>
              {type === authType.register && 'Войти'}
              {type === authType.login && 'Регистрация'}
            </AppLink>
          </div>
        </div>
      </form>
    </>
  )
}
