import { SubmitHandler, useForm } from 'react-hook-form'
import cx from 'classix'

import { IClient } from '@/entities/Client'
import { Button, ButtonSize } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Text, TextSize } from '@/shared/ui/Text'

import { useAddNewClient } from '../model/api/addClientApi'

import cls from './AddNewClientForm.module.scss'

type ClientDataType = Omit<IClient, 'id'>

export const AddNewClientForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<ClientDataType>({ mode: 'onChange' })
  const [addClient, { data: resClient, status }] = useAddNewClient()

  const onSubmit: SubmitHandler<ClientDataType> = (data) => {
    addClient(data)
    reset()
  }

  if (status === 'fulfilled') {
    console.log(resClient)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cx(cls.form)}>
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
        placeholder="Иван"
        className={cls.input}
        inputName="Имя"
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
        placeholder="Иванов"
        className={cls.input}
        inputName="Фамилия"
      />

      <Input
        {...register('lastName', {
          required: 'Обязательное поле',
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
        placeholder="Иванович"
        className={cls.input}
        inputName="Отчество"
      />

      <fieldset className={cls.gender}>
        <label className={cls.gender__row}>
          <Text size={TextSize.S}>Мужской</Text>
          <input type="radio" value="1" defaultChecked {...register('sex')} />
        </label>
        <label className={cls.gender__row}>
          <Text size={TextSize.S}>Женский</Text>
          <input type="radio" value="0" {...register('sex')} />
        </label>
      </fieldset>

      <Input
        {...register('birthday', {
          pattern: {
            value: /\d{2}\.\d{2}\.\d{4}/,
            message: 'Дата должна быть в формате ДД.ММ.ГГГГ',
          },
        })}
        error={errors?.birthday?.message}
        placeholder="дд.мм.гггг"
        className={cls.input}
        inputName="Дата рождения"
      />

      <Input
        {...register('email', {
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            message: 'Введите валидный email',
          },
        })}
        error={errors?.email?.message}
        placeholder="ivan.ivanov@mail.ru"
        className={cls.input}
        inputName="Email"
      />

      <Input
        {...register('mobilePhone', {
          minLength: {
            value: 11,
            message: 'Не менее 11 символов',
          },
          maxLength: {
            value: 16,
            message: 'Не более 16 символов',
          },
        })}
        defaultValue="+79"
        error={errors?.mobilePhone?.message}
        placeholder="+7(999)999-99-99"
        className={cls.input}
        inputName="Телефон"
      />

      <Input
        type="tel"
        {...register('personalTrainingCount', {
          maxLength: {
            value: 3,
            message: 'Не длиннее 3 символов',
          },
          min: {
            value: 1,
            message: 'Минимум 1',
          },
          max: {
            value: 100,
            message: 'Значение не должно превышать 100',
          },
          pattern: {
            value: /^[0-9]*$/,
            message: 'Только цифры от 0 до 9',
          },
        })}
        error={errors?.personalTrainingCount?.message}
        placeholder="0"
        className={cls.input}
        inputName="Количество персональных тренировок"
      />
      <Button type="submit" size={ButtonSize.M} disabled={!isDirty || !isValid}>
        Добавить
      </Button>
    </form>
  )
}
