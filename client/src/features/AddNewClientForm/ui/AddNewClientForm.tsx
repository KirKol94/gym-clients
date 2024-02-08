import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import cx from 'classix'

import { IClient } from '@/entities/Client'
import { useGetAllClients } from '@/features/ClientList/model/api/clientsApi'
import { BaseMaskInput } from '@/shared/ui/BaseMaskInput'
import { Button, ButtonSize } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { Text, TextSize } from '@/shared/ui/Text'

import { useAddNewClient } from '../model/api/addClientApi'
import { schema } from '../model/schema'

import cls from './AddNewClientForm.module.scss'

type ClientDataType = Omit<IClient, 'id'>

export const AddNewClientForm = () => {
  const methods = useForm<ClientDataType>({
    mode: 'onChange',
    resolver: joiResolver(schema),
  })
  const { refetch } = useGetAllClients()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = methods
  const [addClient, { data: resClient, status }] = useAddNewClient()

  const onSubmit: SubmitHandler<ClientDataType> = (data) => {
    addClient(data)
    reset()
    refetch()
  }

  if (status === 'fulfilled') {
    console.log(resClient)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={cx(cls.form)}>
        <Input
          {...register('firstName')}
          error={errors?.firstName?.message}
          placeholder="Иван"
          className={cls.input}
          inputName="Имя"
        />

        <Input
          {...register('middleName')}
          error={errors?.middleName?.message}
          placeholder="Иванович"
          className={cls.input}
          inputName="Отчество"
        />

        <Input
          {...register('lastName')}
          error={errors?.lastName?.message}
          placeholder="Иванов"
          className={cls.input}
          inputName="Фамилия"
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
          {...register('birthday')}
          error={errors?.birthday?.message}
          placeholder="дд.мм.гггг"
          className={cls.input}
          inputName="Дата рождения"
        />

        <Input
          {...register('email')}
          error={errors?.email?.message}
          placeholder="ivan.ivanov@mail.ru"
          className={cls.input}
          inputName="Email"
        />

        <BaseMaskInput
          label="Телефон"
          name="mobilePhone"
          type="tel"
          format="+7 (###) ###-##-##"
          placeholder="+7 (999) 999-99-99"
          className={cls.input}
        />

        <Input
          type="tel"
          {...register('personalTrainingCount')}
          error={errors?.personalTrainingCount?.message}
          placeholder="0"
          defaultValue={0}
          className={cls.input}
          inputName="Количество персональных тренировок"
        />
        <Button type="submit" size={ButtonSize.M} disabled={!isDirty || !isValid}>
          Добавить
        </Button>
      </form>
    </FormProvider>
  )
}
