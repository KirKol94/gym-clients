import { memo } from 'react'
import { FormProvider, type SubmitHandler, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import cx from 'classix'

import type { IClient } from '@/entities/Client'
import { BaseMaskInput } from '@/shared/ui/BaseMaskInput'
import { Button, buttonSize } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'
import { RadioButton } from '@/shared/ui/RadioButton'
import { Title, titleSize } from '@/shared/ui/Title'
import { isObjectEmpty } from '@/shared/utils/isEmptyObj'

import { useUpdateClientData } from '../model/api/client.update'
import { schema } from '../model/schema'

import cls from './EditClientDataForm.module.scss'

export interface EditClientDataFormProps {
  className?: string
  client: IClient
  refetch: () => void
}

export const EditClientDataForm = memo(({ className, client, refetch }: EditClientDataFormProps) => {
  const editClientDataFormClass = cx(cls.editClientDataForm, className)
  const [updateData] = useUpdateClientData()

  const methods = useForm<IClient>({
    resolver: joiResolver(schema),
    mode: 'onChange',
    defaultValues: client,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods

  const onSubmit: SubmitHandler<IClient> = async (data: IClient) => {
    await updateData(data)
    refetch()
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={editClientDataFormClass}>
        <Title level={2} size={titleSize.xl} className={cls.title}>
          Изменить данные
        </Title>

        <Input {...register('firstName')} error={errors?.firstName?.message} placeholder="Иван" inputName="Имя" />

        <Input
          {...register('middleName')}
          error={errors?.middleName?.message}
          placeholder="Иванович"
          inputName="Отчество"
        />

        <Input {...register('lastName')} error={errors?.lastName?.message} placeholder="Иванов" inputName="Фамилия" />

        <fieldset>
          <RadioButton text="Мужской" {...register('sex')} value="1" defaultChecked />
          <RadioButton text="Женский" {...register('sex')} value="0" />
        </fieldset>

        <BaseMaskInput label="Дата рождения" name="birthday" type="text" format="##.##.####" placeholder="дд.мм.гггг" />

        <BaseMaskInput
          label="Телефон"
          name="mobilePhone"
          type="tel"
          format="+7 (###) ###-##-##"
          placeholder="+7 (999) 999-99-99"
        />

        <Input
          {...register('email')}
          error={errors?.email?.message}
          placeholder="ivan.ivanov@mail.ru"
          inputName="Email"
        />

        <Input
          type="tel"
          {...register('personalTrainingCount')}
          error={errors?.personalTrainingCount?.message}
          placeholder="0"
          defaultValue={0}
          inputName="Количество персональных тренировок"
        />

        <Button type="submit" size={buttonSize.m} disabled={!isObjectEmpty(errors)}>
          Сохранить
        </Button>
      </form>
    </FormProvider>
  )
})
