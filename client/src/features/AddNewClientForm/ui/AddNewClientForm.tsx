import { ChangeEvent, FormEvent, useState } from 'react'
import cx from 'classix'

import { IClient } from '@/entities/Client'
import { Button, ButtonSize } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

import { useAddNewClient } from '../model/api/addClientApi'

import cls from './AddNewClientForm.module.scss'

type ClientDataType = Omit<IClient, 'id'>

export const AddNewClientForm = () => {
  const [addClient, { data: resClient, status }] = useAddNewClient()

  const [client, setClient] = useState<ClientDataType>({
    firstName: '',
    middleName: '',
    lastName: '',
    sex: 1,
    email: '',
    birthday: '',
    mobilePhone: '',
    personalTrainingCount: 0,
  })

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setClient((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addClient(client)
  }

  if (status === 'fulfilled') {
    console.log(resClient)
  }

  return (
    <form onSubmit={handleSubmit} className={cx(cls.form)}>
      <Input className={cls.input} inputName="Имя" name="firstName" onChange={handleChange} value={client.firstName} />
      <Input
        className={cls.input}
        inputName="Фамилия"
        name="middleName"
        onChange={handleChange}
        value={client.middleName}
      />
      <Input
        className={cls.input}
        inputName="Отчество"
        name="lastName"
        onChange={handleChange}
        value={client.lastName}
      />
      <Input className={cls.input} inputName="Пол" name="sex" onChange={handleChange} value={client.sex} />
      <Input
        className={cls.input}
        inputName="Дата рождения"
        name="birthday"
        onChange={handleChange}
        value={client.birthday}
      />
      <Input className={cls.input} inputName="Email" name="email" onChange={handleChange} value={client.email} />
      <Input
        className={cls.input}
        inputName="Телефон"
        name="mobilePhone"
        onChange={handleChange}
        value={client.mobilePhone}
      />
      <Input
        className={cls.input}
        type="number"
        inputName="Количество персональных тренировок"
        name="personalTrainingCount"
        onChange={handleChange}
        value={client.personalTrainingCount}
      />
      <Button type="submit" size={ButtonSize.M}>
        Добавить
      </Button>
    </form>
  )
}
